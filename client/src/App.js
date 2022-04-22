import { useState, useEffect } from "react";
import { fetchData, sendData } from "./dataReceiver";
//import './app.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [previous, setPrevious] = useState([]);

  useEffect(() => {
    fetchData().then((response) => {
      setPlants(response);
      setPrevious(structuredClone(response));
    });
  }, []);

  const water = (id) => {
    const tempPlants = [...plants];
    const index = tempPlants.findIndex((element) => element.id === id);
    tempPlants[index].lastDate = new Date();
    setPlants(tempPlants);
    sendData(tempPlants);
  };

  const undoWater = (id) => {
    const tampPlants = [...plants];
    const index = tampPlants.findIndex((element) => element.id === id);
    const prevIndex = previous.findIndex((element) => element.id === id);
    tampPlants[index].lastDate = previous[prevIndex].lastDate;
    setPlants(tampPlants);
    sendData(tampPlants);
  };

  return (
    <div className="mainList">
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <span>{plant.name}</span>
            <span>{plant.lastDate.toString()}</span>
            <button onClick={() => water(plant.id)}>💦</button>
            <button onClick={() => undoWater(plant.id)}>🔙</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
