import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 33.9396,
  longitude: -81.3108,
  current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "weather_code"],
  temperature_unit: "fahrenheit",
  wind_speed_unit: "mph",
  precipitation_unit: "inch",
  timezone: "auto",
};

const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Define units based on params for easy referencing
const unitsMap = {
  temperature_2m: params.temperature_unit === "fahrenheit" ? "°F" : "°C",
  relative_humidity_2m: "%",
  apparent_temperature: params.temperature_unit === "fahrenheit" ? "°F" : "°C",
  precipitation: params.precipitation_unit === "inch" ? "in" : "mm",
  weather_code: "", // No specific unit
};

// Helper function to format weather data
const formatWeatherData = (response) => {
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current();
  const time = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);

  // Dynamically construct current weather data based on `params.current`
  const currentWeather = { time };
  
  params.current.forEach((variable, index) => {
    const value = current.variables(index).value();
    
    currentWeather[variable] = {
      value: Number.isFinite(value) ? Math.round(value) : value, // Rounds to nearest whole number if numeric
      unit: unitsMap[variable] || "",
    };
  });

  return {
    location: {
      latitude: response.latitude(),
      longitude: response.longitude(),
      timezone: response.timezone(),
      timezoneAbbreviation: response.timezoneAbbreviation(),
    },
    current: currentWeather,
  };
};

// Format and export weather data
export const getWeatherData = () => {
  return formatWeatherData(responses[0]); // assuming a single response object
};
