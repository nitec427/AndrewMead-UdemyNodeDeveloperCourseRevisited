const yargs = require("yargs");
const fs = require("fs");
const chalk = require("chalk");
const { hideBin } = require("yargs/helpers");
const addNote = () => {};
const removeNote = (filename) => {
  // add extension
  const path_to_remove = filename + ".txt";
  if (!fs.existsSync(path_to_remove)) {
    console.error(chalk.bgRed("No note found with given name"));
  }
  fs.readFile(path_to_remove, (encoding = "utf-8"), function (err, data) {
    if (err) throw err;
    console.log("The note is being read before removing");
    console.log(chalk.cyan(data));
  });
  fs.unlink(path_to_remove, (err) => {
    if (err) throw err;
    console.log("Successfully deleted");
  });
};
const readNote = (filename) => {
  // Read notes by its title
  const new_fn = filename + ".txt";
  if (!fs.existsSync(new_fn)) {
    console.error(chalk.bgRed("No note found with given name"));
  }
  fs.readFile(new_fn, (encoding = "utf-8"), function (err, data) {
    if (err) throw err;
    console.log(chalk.green("Here is your note: "));
    console.log(chalk.cyan(data));
  });
};
const listNotes = () => {
  // List all the notes in this directory
};
// const argv = yargs(hideBin(process.argv)).argv;
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log(argv.title);
    console.log(argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove existing note",
  handler: removeNote.bind(null, yargs.argv.fn),
});
yargs.command({
  command: "list",
  describe: "List all notes in this directory",
  handler: listNotes,
});
yargs.command({
  command: "read",
  describe: "Read note by its title",
  handler: readNote.bind(null, yargs.argv.fn),
});

yargs.parse();
