const express = require("express");
const user = express.Router();
const User = require("../models/user");
user.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(req.body);
  } catch (err) {
    res.status(404).send(err);
  }
});
user.post("/login", async (req, res) => {
  // define your own function
  try {
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    return res.status(200).send(user);
  } catch (err) {
    return res.status(404).send(err);
  }
});
user.get("/", async (req, res) => {
  try {
    console.log("Users are being getting saved");
    const users = await User.find();
    res.status(200).send(users);
    console.log("Users stored successfully");
  } catch (err) {
    console.log(err);
  }
  // res.status(200).send(all_users);
});
user.get("/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const user = await User.findById(user_id);
    if (!user) throw new Error("User not found with id " + user_id);
    return res.status(200).send(user);
  } catch (err) {
    return res.status(404).send("User not found with this  id ");
  }
});
user.patch("/:id", async (req, res) => {
  // Allowed updates

  const allowed_updates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every((update) =>
    allowed_updates.includes(update)
  );
  if (!isValidUpdate)
    return res.status(400).send({ error: "Invalid option provided" });
  try {
    //   When updating the user findbyIdAndUpdate bypasses the mongoose API

    const user = await User.findById({ _id: req.params.id });
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send("Updated");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

user.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    console.log(user);
    if (!user) return res.status(404).send("No user found with given id");
    return res.status(200).send("The following user is deleted");
  } catch (err) {
    return res.status(404).send("An error has occurred");
  }
});
module.exports = user;
