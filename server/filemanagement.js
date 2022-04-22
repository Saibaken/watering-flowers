const fs = require("fs");

module.exports.getData = () => {
  return JSON.parse(fs.readFileSync("flowers.json")) ?? [];
};

module.exports.updateFlower = (id) => {
  flowers = module.exports.getData();
  index = flowers.findIndex(element => element.id === id);
  flowers[index].lastDate = new Date();
  fs.writeFileSync("flowers.json", JSON.stringify(flowers));
};
