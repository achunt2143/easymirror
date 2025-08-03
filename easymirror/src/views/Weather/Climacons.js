const weatherCodeToClimaconMap = {
    0: require('../../../resources/climacons/SVG/Sun.svg'),                   // Clear sky
    1: require('../../../resources/climacons/SVG/Sun-Low.svg'),               // Mostly clear
    2: require('../../../resources/climacons/SVG/Cloud-Sun.svg'),             // Partly cloudy
    3: require('../../../resources/climacons/SVG/Cloud.svg'),                 // Overcast

    45: require('../../../resources/climacons/SVG/Cloud-Fog.svg'),            // Fog
    48: require('../../../resources/climacons/SVG/Cloud-Fog-Alt.svg'),        // Depositing rime fog

    51: require('../../../resources/climacons/SVG/Cloud-Drizzle-Sun.svg'),    // Light drizzle
    53: require('../../../resources/climacons/SVG/Cloud-Drizzle.svg'),        // Moderate drizzle
    55: require('../../../resources/climacons/SVG/Cloud-Drizzle-Alt.svg'),    // Dense drizzle

    61: require('../../../resources/climacons/SVG/Cloud-Rain-Sun-Alt.svg'),   // Slight rain
    63: require('../../../resources/climacons/SVG/Cloud-Rain-Alt.svg'),       // Moderate rain
    65: require('../../../resources/climacons/SVG/Cloud-Rain.svg'),           // Heavy rain

    71: require('../../../resources/climacons/SVG/Cloud-Snow-Sun.svg'),       // Slight snowfall
    73: require('../../../resources/climacons/SVG/Cloud-Snow-Alt.svg'),       // Moderate snowfall
    75: require('../../../resources/climacons/SVG/Cloud-Snow.svg'),           // Heavy snowfall

    80: require('../../../resources/climacons/SVG/Cloud-Rain-Sun.svg'),       // Slight showers
    81: require('../../../resources/climacons/SVG/Cloud-Rain-Alt.svg'),       // Moderate showers
    82: require('../../../resources/climacons/SVG/Cloud-Rain.svg'),           // Violent rain showers

    85: require('../../../resources/climacons/SVG/Cloud-Snow-Alt.svg'),       // Light snow showers
    86: require('../../../resources/climacons/SVG/Cloud-Snow.svg'),           // Heavy snow showers

    95: require('../../..//resources/climacons/SVG/Cloud-Lightning.svg'),      // Thunderstorm
    96: require('../../../resources/climacons/SVG/Cloud-Hail.svg'),           // Thunderstorm with slight hail
    99: require('../../../resources/climacons/SVG/Cloud-Hail-Alt.svg'),       // Thunderstorm with heavy hail
};

// Default icon if code isn't found
const defaultIcon = require('../../../resources/climacons/SVG/Thermometer.svg');

export function getClimaconIcon(weatherCode) {
    return weatherCodeToClimaconMap[weatherCode] || defaultIcon;
}
