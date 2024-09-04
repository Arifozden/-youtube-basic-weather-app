import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import City from "./City";

function App() {
  const key = "7607fc84427485dc1fdb9300bf7763d0"; // Buraya kendi OpenWeatherMap API anahtarınızı ekleyin.
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(null);

  useEffect(() => {
    async function getApi() {
      if (!search) return; // Search boşsa API çağrısını yapma
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=metric`
        );
        console.log("API Response:", response);
        setCity(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    }
    getApi();
  }, [search]);
  

  const handleSearch = () => {
    setSearch(query);
  };

  return (
    <div className="App">
      
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Enter city name"
        className="my-5 px-3 w-[250px] py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Search
      </button>
      {city && <City city={city} />}
    </div>

  );
}

export default App;
