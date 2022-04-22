import { v4 as uuidv4 } from "uuid";

export const fetchData = () => {
  return [
    {
      name: "ABC",
      id: uuidv4(),
      lastDate: new Date(2020, 12, 12, 14, 55, 32),
    },
    {
      name: "DEF",
      id: uuidv4(),
      lastDate: new Date(2021, 9, 10, 12, 0, 0),
    },
  ];
};
