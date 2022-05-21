const express = require("express");

require("./db/mongoose");
// create app
const app = express();

// set routers and port
const taskRouter = require("./routes/task");
const userRouter = require("./routes/user");
const port = process.env.PORT || 3000;

// use built-in middlewares and your route handlers
app.use(express.json());
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

// listen on this port
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
