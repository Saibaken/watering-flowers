const fs = require("fs");

module.exports.getData = () => {
  return JSON.parse(fs.readFileSync("flowers.json")) ?? [];
};

module.exports.updateData = (data) => {
  fs.writeFileSync("flowers.json", JSON.stringify(data));
};
