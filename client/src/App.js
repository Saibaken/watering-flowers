import { useState, useEffect } from "react";
import { fetchData, sendData } from "./dataReceiver";

function App() {
  const [flowers, setFlowers] = useState([]);
  const [previous, setPrevious] = useState([]);

  useEffect(() => {
    fetchData().then((response) => {
      setFlowers(response);
      setPrevious(structuredClone(response));
    });
  }, []);

  const water = (id) => {
    const tempFlowers = [...flowers];
    const index = tempFlowers.findIndex((element) => element.id === id);
    tempFlowers[index].lastDate = new Date();
    setFlowers(tempFlowers);
    sendData(tempFlowers);
  };

  const undoWater = (id) => {
    const tempFlowers = [...flowers];
    const index = tempFlowers.findIndex((element) => element.id === id);
    const prevIndex = previous.findIndex((element) => element.id === id);
    tempFlowers[index].lastDate = previous[prevIndex].lastDate;
    setFlowers(tempFlowers);
    sendData(tempFlowers);
  };

  return (
    <div>
      <ul>
        {flowers.map((flower) => (
          <li key={flower.id}>
            <span>{flower.name}</span>
            <span>{flower.lastDate.toString()}</span>
            <button onClick={() => water(flower.id)}>💦</button>
            <button onClick={() => undoWater(flower.id)}>🔙</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
