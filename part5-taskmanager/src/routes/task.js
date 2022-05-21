const express = require("express");
const task = express.Router();
const { Task } = require("../models/task");
task.post("/", (req, res) => {
  try {
    const task = new Task(req.body);
    task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Update Task
task.patch("/:id", async (req, res) => {
  const allowed_updates = ["description", "body"];
  const updates = Object.keys(req.body);
  const isValid = updates.every((updates) => allowed_updates.includes(updates));
  if (!isValid) return res.status(400).send({ error: "Invalid update given" });
  try {
    const task = await Task.findById(req.params.id);
    // apply updates one by onw
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) return res.status(400).send({ error: "Task not found" });
    return res.status(200).send("Updated");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
// Get all the tasks
task.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) return res.status(404).send("No tasks found");
    return res.status(201).send(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error has occurred");
  }
});
// get task by id
task.get("/:id", async (req, res) => {
  try {
    const task_id = req.params.id;
    const task = await Task.findById(task_id);
    if (!task) return res.status(404).send("No task found with given id");
    return res.status(201).send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error has occurred");
  }
});
task.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id });
    console.log(task);
    if (!task) return res.status(404).send("No task found with given id");
    return res.status(200).send("The following task is deleted", task);
  } catch (err) {
    return res.status(404).send("An error has occurred");
  }
});
module.exports = task;
