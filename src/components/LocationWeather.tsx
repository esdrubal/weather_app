import { useAppSelector, useAppDispatch } from '../redux/hooks';
import React, { useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { setLocationDetails } from '../redux/slices/weather'
import { capitalizeFirstChar, round, kelvinToCelsius } from '../helpers'
import { openWeatherMapApiKey } from '../../config'

interface Props {
  locationId: number
}

const CityCountry = styled.div`
  font-size: 36px;
  font-weight: 300;
  padding: 0.2em 0;`


const MainTemp = styled.div`
  font-size: 36px;
  font-weight: 300;
  padding: 0.2em 0;`

const WeatherDescription = styled.div`
  font-weight: 500;`

const WeatherItemList = styled.ul`
  list-style: none;
  padding: 1em 0;
  margin: 0;`

const LocationWeather: React.FC<Props> = (props) => {
  
  const locationState = useAppSelector((state) => state.weather.locations.find(l => l.id === props.locationId));
  const locationDetailsState = useAppSelector((state) => state.weather.locationsDetails.find(l => l.locationId === props.locationId));

  const dispatch = useAppDispatch()

  const fetchLocationWeather = (latitude: number, longitude: number) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}`)
      .then(function(result){
        dispatch(setLocationDetails({
          locationId: props.locationId,
          timestamp: new Date().getTime(),
          temperature: result.data.main.temp,
          temperatureFeelsLike: result.data.main.feels_like,
          temperatureMax: result.data.main.temp_max,
          temperatureMin: result.data.main.temp_min,
          airPressure: result.data.main.pressure,
          humidity: result.data.main.humidity,
          visibility: result.data.visibility,
          description: result.data.weather[0].description
        }))
      });
  }

  useEffect(() => {
    if (locationState)
      fetchLocationWeather(locationState!.latitude, locationState!.longitude)
  }, [locationState]);

  return (
    <div>
      { !locationState &&
        <div>Trying to load unknown location</div>
      }
      { locationState &&
        <div>
          <CityCountry>{capitalizeFirstChar(locationState!.city)}, {capitalizeFirstChar(locationState!.country)}</CityCountry>
          Latitude:{round(locationState!.latitude, 4)} Longitude:{round(locationState!.longitude, 4)}
        </div>
      }
      { locationDetailsState &&
        <div>
          <MainTemp>{round(kelvinToCelsius(locationDetailsState!.temperature),1)}°C</MainTemp>
          <WeatherDescription>Feels like {round(kelvinToCelsius(locationDetailsState!.temperatureFeelsLike),1)}°C. {capitalizeFirstChar(locationDetailsState!.description)}.</WeatherDescription>
          <WeatherItemList>
            <li>Pressure: {locationDetailsState!.airPressure}hPa</li>
            <li>Visibility: {locationDetailsState!.visibility}m</li>
            <li>Humidity: {locationDetailsState!.humidity}%</li>
          </WeatherItemList>
        </div>
      }
    </div>
  );
};

export default LocationWeather;