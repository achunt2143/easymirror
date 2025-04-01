import React, { Component } from 'react';
import moment from 'moment';
import './miniweather.css';  // Custom styles
import Item from '@enact/sandstone/Item';
import { Header, Panel } from '@enact/sandstone/Panels';
import { getWeatherData } from './WeatherData';
import BodyText from '@enact/sandstone/BodyText';
import Heading from '@enact/sandstone/Heading';
import Image from '@enact/sandstone/Image';
import { getClimaconIcon } from './Climacons';
import { getFeelsLikeIcon, getHumidityIcon, getPrecipitationIcon, getTempIcon } from './WeatherIcons';

class MiniWeather extends Component {
    state = {
        weatherContext: 'context',
        weatherData: getWeatherData(),
        weatherIcon: getClimaconIcon(),
        tempIcon: getTempIcon(),
        feelsLikeIcon: getFeelsLikeIcon(),
        humidityIcon: getHumidityIcon(),
        precipIcon: getPrecipitationIcon()
    };

    currentWeather = () => {
        return this.state.weatherData;
    };

    getIcon = (icon) => {
        return getClimaconIcon(icon);
    };

    renderWeather = () => {
        let weather = this.currentWeather();
        let icon = this.getIcon(weather.current.weather_code.value);

        return (
            <Panel className="weather-panel" noCloseButton>
                <Header title="Currently" />

                <div className="weather-overview">
                    <Image className="weather-icon white-icon" src={icon} />
                    <Heading className="temperature">{weather.current.temperature_2m.value}{weather.current.temperature_2m.unit}</Heading>
                </div>

                <div className="weather-details">
                    <Image className="detail-icon white-icon" src={this.state.feelsLikeIcon} />
                    <div className="weather-detail">
                        <BodyText>Feels like: {weather.current.apparent_temperature.value}{weather.current.apparent_temperature.unit}</BodyText>
                    </div>
                    <Image className="detail-icon white-icon" src={this.state.humidityIcon} />
                    <div className="weather-detail">
                        <BodyText>{weather.current.relative_humidity_2m.value}{weather.current.relative_humidity_2m.unit}</BodyText>
                    </div>
                    <Image className="detail-icon white-icon" src={this.state.precipIcon} />
                    <div className="weather-detail">
                        <BodyText>{weather.current.precipitation.value}{weather.current.precipitation.unit}</BodyText>
                    </div>
                </div>
            </Panel>
        );
    };


    render() {
        return (
            <div className="mini-weather">
                {this.renderWeather()}
            </div>
        );
    }
}

export default MiniWeather;
