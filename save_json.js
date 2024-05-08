const fs = require("fs");
const path = require("path");

const save = (data) => {
  console.log("saving");
  fs.writeFile(
    path.join(__dirname, ".", "participants.json"),
    JSON.stringify(data),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

module.exports = { save };