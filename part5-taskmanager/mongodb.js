const { ObjectID } = require("bson");
const { MongoClient, ObjectId } = require("mongodb");
const connection_url = "mongodb://127.0.0.1:27017";
const database_name = "task-manager";
const client = new MongoClient(connection_url);
async function run() {
  try {
    await client.connect();
    const database = client.db(database_name);
    const users = database.collection("users");
    const tasks = database.collection("tasks");

    // Insert multiple tasks
    const task_res = await tasks.insertMany([
      {
        description: "Write some C++ code",
        completed: false,
        difficulty: 3,
      },
      {
        description: "Learn Haskell and FP",
        completed: true,
        difficulty: 4,
      },
      {
        description: "Join Gozde Unal's lab",
        completed: false,
        difficulty: 7,
      },
    ]);
    const usersData = await users.insertMany([
      {
        name: "Franz Kafka",
        job: "ML Engineer",
        salary: 102000,
        age: 47,
      },
      {
        name: "Benjamin Mendy",
        job: "Back-end Developer",
        salary: 1000,
        age: 24,
      },
      {
        name: "Peter Zumthor",
        job: "Data Engineer",
        salary: 70500,
        age: 76,
      },
      {
        name: "Miha Zajc",
        job: "Assistant",
        salary: 90500,
        age: 27,
      },
      {
        name: "Hugo Chavez",
        job: "Emperor",
        salary: 270500,
        age: 102,
      },
    ]);
    const filter = { salary: { $gt: 100000 } };
    const updateDocs = {
      $set: {
        salary: Math.floor(Math.random() * 10000) + 120000,
      },
    };
    const updated_count = await users.updateMany(filter, updateDocs);
    console.log(`Updated ${updated_count.modifiedCount} element `);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
