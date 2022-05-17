const chalk = require("chalk");

const log = console.log;

log(
  chalk.blue("Hi") +
    chalk.blue.underline.bold("Mom") +
    chalk.bgGreen("How are you doing")
);
