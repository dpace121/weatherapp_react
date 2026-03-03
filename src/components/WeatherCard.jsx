import React, { useEffect, useState } from "react";
import Search from "./Search";

const WeatherCard = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("C"); // C or F

  const fetchWeatherData = async (param) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=8d2bafa1303a38f085aa24796b244d09`,
      );

      const data = await response.json();

      console.log(data);
      setWeatherData(data);
      if (data) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const convertTemperature = (tempInKelvin) => {
    if (!tempInKelvin) return "";

    const celsius = tempInKelvin - 273.15;
    const fahrenheit = (celsius * 9) / 5 + 32;

    return unit === "C"
      ? `${celsius.toFixed(1)} °C`
      : `${fahrenheit.toFixed(1)} °F`;
  };
  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const handleSearch = () => {
    fetchWeatherData(search);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchWeatherData("Kathmandu");
  }, []);

  console.log(weatherData);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>

          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">
            {convertTemperature(weatherData?.main?.temp)}
          </div>

          <button className="unit-toggle" onClick={toggleUnit}>
            Switch to °{unit === "C" ? "F" : "C"}
          </button>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
