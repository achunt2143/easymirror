// WeatherService.js
import React, {useState, useEffect} from 'react';
import {fetchWeatherApi} from 'openmeteo';
import Weather from './Weather'; // The kind (pure UI) below

const params = {
  latitude: 33.9396,
  longitude: -81.3108,
  current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "weather_code"],
  temperature_unit: "fahrenheit",
  wind_speed_unit: "mph",
  precipitation_unit: "inch",
  timezone: "auto"
};

const url = "https://api.open-meteo.com/v1/forecast";

const unitsMap = {
  temperature_2m: "°F",
  relative_humidity_2m: "%",
  apparent_temperature: "°F",
  precipitation: "in",
  weather_code: ""
};

function formatWeatherData(response) {
  if (!response) return null;
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current();
  const time = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);
  const currentWeather = {time};
  params.current.forEach((variable, idx) => {
    const value = current.variables(idx).value();
    currentWeather[variable] = {
      value: Number.isFinite(value) ? Math.round(value) : value,
      unit: unitsMap[variable] || ""
    };
  });
  return {
    location: {
      latitude: response.latitude(),
      longitude: response.longitude(),
      timezone: response.timezone(),
      timezoneAbbreviation: response.timezoneAbbreviation()
    },
    current: currentWeather
  };
}

const WeatherService = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('weather service...');

  useEffect(() => {
    console.log('useeffect fetch weather...');
    // Fetch weather on mount
    console.log('fetch weather...');
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await fetchWeatherApi(url, params);
        const data = formatWeatherData(responses[0]);
        setWeatherData(data);
        setError(null);
      } catch (e) {
        setError("Failed to fetch weather.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Weather
      weatherData={weatherData}
      loading={loading}
      error={error}
      {...props}
    />
  );
};

export default WeatherService;
