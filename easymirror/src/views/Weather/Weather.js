// Weather.js
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import { Panel, Header } from '@enact/sandstone/Panels';
import BodyText from '@enact/sandstone/BodyText';
import Heading from '@enact/sandstone/Heading';
import Image from '@enact/sandstone/Image';
import Spinner from '@enact/sandstone/Spinner';
import './miniweather.css';
import { getClimaconIcon } from './Climacons';
import { getFeelsLikeIcon, getHumidityIcon, getPrecipitationIcon, getTempIcon } from './WeatherIcons';

const Weather = kind({
    name: 'Weather',
    propTypes: {
        weatherData: PropTypes.object,
        loading: PropTypes.bool,
        error: PropTypes.string
    },
    render: ({ weatherData, loading, error }) => {
        if (loading) {
            return (
                <Panel className="weather-panel" noCloseButton>
                    <Header title={`\n`} />
                    <Spinner>Loading weather...</Spinner>
                </Panel>
            );
        }
        if (error) {
            return (
                <Panel className="weather-panel" noCloseButton>
                    <Header title={`\n`} />
                    <BodyText>{error}</BodyText>
                </Panel>
            );
        }
        if (!weatherData) {
            return (
                <Panel className="weather-panel" noCloseButton>
                    <Header title={`\n`} />
                    <BodyText>No weather data available</BodyText>
                </Panel>
            );
        }
        const icon = getClimaconIcon(weatherData.current.weather_code?.value);

        return (
            <Panel className="weather-panel" noCloseButton>
                <Header title={`\nCurrently`} />
                <div className="weather-overview">
                    <Image className="weather-icon white-icon" src={icon} />
                    <Heading className="temperature">
                        {weatherData.current.temperature_2m?.value}{weatherData.current.temperature_2m?.unit}
                    </Heading>
                </div>
                <div className="weather-details">
                    <Image className="detail-icon white-icon" src={getFeelsLikeIcon()} />
                    <div className="weather-detail">
                        <BodyText>
                            Feels like: {weatherData.current.apparent_temperature?.value}{weatherData.current.apparent_temperature?.unit}
                        </BodyText>
                    </div>
                    <Image className="detail-icon white-icon" src={getHumidityIcon()} />
                    <div className="weather-detail">
                        <BodyText>
                            Humidity: {weatherData.current.relative_humidity_2m?.value}{weatherData.current.relative_humidity_2m?.unit}
                        </BodyText>
                    </div>
                    <Image className="detail-icon white-icon" src={getPrecipitationIcon()} />
                    <div className="weather-detail">
                        <BodyText>
                            Precipitation: {weatherData.current.precipitation?.value}{weatherData.current.precipitation?.unit}
                        </BodyText>
                    </div>
                </div>
            </Panel>
        );
    }
});

export default Weather;
