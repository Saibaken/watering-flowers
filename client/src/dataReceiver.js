export const fetchData = async () => {
  const response = await fetch("http://localhost:3001/getData").then((response) =>
    response.json()
  );
  response.forEach(flower => {
    flower.lastDate = new Date(flower.lastDate);
  });
  return response;
};

export const sendData = (data) => {
  fetch("http://localhost:3001/updateData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}