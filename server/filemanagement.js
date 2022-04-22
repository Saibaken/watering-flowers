const fs = require("fs");

module.exports.getData = () => {
  return JSON.parse(fs.readFileSync("flowers.json")) ?? [];
};

module.exports.updateFlower = (data) => {
  fs.writeFileSync("flowers.json", JSON.stringify(data));
};
