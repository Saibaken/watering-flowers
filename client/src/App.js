import "./App.css";
import { useState, useEffect } from "react";
import { fetchData } from "./dataReceiver";

function App() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    setFlowers(fetchData())
  }, []);

  const water = (id) => {
    const tempFlowers = [...flowers];
    const index = tempFlowers.findIndex((element) => element.id === id);
    tempFlowers[index].lastDate = new Date();
    setFlowers(tempFlowers);
  };

  return (
    <div>
      <ul>
        {flowers.map(
          (flower) => 
          <li key={flower.id}>
            <span>{flower.name}</span>
            <span>{flower.lastDate.toString()}</span>
            <button onClick={() => water(flower.id)}>💦</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
