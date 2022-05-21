require("../src/db/mongoose");

const { Task } = require("../src/models/task");

// deleteTaskandCOunt

// Task.findByIdAndDelete();

const deleteTaskandCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  console.log(task);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskandCount("628745bce8acce956bcea562")
  .then((count) => console.log(count))
  .catch((err) => console.error(err));
