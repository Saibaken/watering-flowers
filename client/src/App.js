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

  const formatDate = (date) => {
    return date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  }

  return (
    <div className="container">
      <div className="plantList">
        <ul>
          {plants.map((plant) => (
            <li className="plantList__listItem" key={plant.id}>
              <span>{plant.name}</span>
              <span>{formatDate(plant.lastDate)}</span>
              <button
                className="plantList__waterButton"
                onClick={() => water(plant.id)}
              >
                💦
              </button>
              <button
                className="plantList__revertButton"
                onClick={() => undoWater(plant.id)}
              >
                🔙
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
