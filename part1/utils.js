const fs = require("fs");
car = {
  developer: "Elon",
  company: "Tesla",
  year: 2020,
};

const readNotes = (filename) => {
  fs.readFile(filename, (encoding = "utf-8"), (err, data) => {
    if (err) throw err;
    console.log(data);
  });
};
module.exports = { car, readNotes };
