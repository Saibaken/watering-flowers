import { useState, useEffect } from "react";
import { fetchData, sendData } from "./dataReceiver";
import classNames from "classnames";

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

  const buttonColor = (plant) => {
    const status = plant.waterFreq - (new Date() - plant.lastDate)/(1000*60*60*24);
    return classNames({
      plantList__waterButton_red: status < 1,
      plantList__waterButton_yellow: (status < 2) && (status >=1),
      plantList__waterButton_green: status > 2
    })
  }

  return (
    <div className="container">
      <ul className="plantList">
        
          {plants.map((plant) => (
            <li className="plantList__listItem" key={plant.id}>
              <span className="d-block">{plant.name}</span>
              <span className="d-block">{formatDate(plant.lastDate)}</span>
              <button
                className={`plantList__waterButton ${buttonColor(plant)}`}
                onClick={() => water(plant.id)}
              >
                💧
              </button>
              <button
                className="plantList__revertButton"
                onClick={() => undoWater(plant.id)}
              >
                ↩️
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
