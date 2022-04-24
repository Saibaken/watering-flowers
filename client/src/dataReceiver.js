export const fetchData = async () => {
  const response = await fetch("http://192.168.1.34:3001/getData").then((response) =>
    response.json()
  );
  response.forEach(flower => {
    flower.lastDate = new Date(flower.lastDate);
  });
  return response;
};

export const sendData = async (data) => {
  const response = await fetch("http://192.168.1.34:3001/updateData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}