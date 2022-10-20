import { useAppDispatch } from '../redux/hooks';
import React, { useEffect } from 'react';
import { setCurrentLocation } from '../redux/slices/weather'
import axios from 'axios'
import { openWeatherMapApiKey } from '../../config'

interface Props {
}

const SetCurrentLocationCoordinates: React.FC<Props> = (props) => {
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${openWeatherMapApiKey}`)
          .then(function(result){
            dispatch(setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              city: result.data[0].name,
              country: result.data[0].country
            }))
          });
      });
    }
  });

  return (
    <div/> 
  )
};

export default SetCurrentLocationCoordinates;