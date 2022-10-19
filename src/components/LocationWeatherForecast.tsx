import { useAppSelector, useAppDispatch } from '../redux/hooks';
import React, { useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { format } from 'date-fns'
import { setCurrentLocationCoordinates, setLocationForecasts, WeatherLocationForecasts } from '../redux/slices/weather'
import {capitalizeFirstChar, round, kelvinToCelsius} from '../helpers'

interface Props {
  locationId: number
}

const Title = styled.div`
  font-size: 36px;
  font-weight: 300;
  padding: 0.2em 0;`

const List = styled.ul`
  padding: 0 3px;`

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;`

const ListValues = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 60%;`

const Temperatures = styled.div`
  `

const Description = styled.div`
  text-align: right;`

const LocationWeatherForecast: React.FC<Props> = (props) => {
  
  const locationState = useAppSelector((state) => state.weather.locations.find(l => l.id === props.locationId));
  const locationForecastsState = useAppSelector((state) => state.weather.locationsForecasts.find(l => l.locationId === props.locationId));

  const dispatch = useAppDispatch()

  const apiKey = "525bead844cbf126aaec797bd62d44f7"

  const fetchLocationWeather = (latitude: number, longitude: number) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then(function(result){
        console.log('Fetch forecast')
        console.log(result)
        const forecasts: WeatherLocationForecasts = {
          locationId: props.locationId,
          forecasts: []
        }
        result.data.list.forEach((el:any) => forecasts.forecasts.push({
          locationId: props.locationId,
          date: new Date(el.dt*1000),
          temperature: el.main.temp,
          temperatureFeelsLike: el.main.feels_like,
          temperatureMax: el.main.temp_max,
          temperatureMin: el.main.temp_min,
          airPressure: el.main.pressure,
          humidity: el.main.humidity,
          visibility: el.visibility,
          description: el.weather[0].description
        }))
        
        dispatch(setLocationForecasts(forecasts))
      });
  }

  useEffect(() => {
    if (props.locationId === 0 && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        dispatch(setCurrentLocationCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude}))
        fetchLocationWeather(position.coords.latitude, position.coords.longitude)
      });
      return
    }

    if (locationState)
      fetchLocationWeather(locationState!.latitude, locationState!.longitude)
  }, [locationState]);

  var forecastElements = null
  if (locationForecastsState)
    forecastElements = locationForecastsState.forecasts.map(forecast => {
      return (
        <ListItem>
          {format(forecast.date, "eee', 'LLL d hh'h'")}
          <ListValues>
            <Temperatures>{round(kelvinToCelsius(forecast.temperatureMax),1)}/{round(kelvinToCelsius(forecast.temperatureMin),1)}°C</Temperatures>
            <Description>{forecast.description}</Description>
          </ListValues>
        </ListItem>
      )
    })

  return (
    <div>
      <Title>5 day / 3 hour forecast</Title>
      { !locationState &&
        <div>Trying to load unknown location</div>
      }
      { forecastElements &&
        <List>
          {forecastElements}
        </List>
      }
    </div>
  );
};

export default LocationWeatherForecast;