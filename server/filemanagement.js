const fs = require("fs");

module.exports.getData = () => {
  return JSON.parse(fs.readFileSync("plants.json")) ?? [];
};

module.exports.updateData = (data) => {
  fs.writeFileSync("plants.json", JSON.stringify(data));
};
