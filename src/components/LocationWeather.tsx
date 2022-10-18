import { useAppSelector, useAppDispatch } from '../redux/hooks';
import React, { useEffect } from 'react';
import { setCurrentLocationCoordinates, fetchLocation } from '../redux/slices/weather'


interface Props {
  locationId: number
}

const LocationWeather: React.FC<Props> = (props) => {
  
  const locationState = useAppSelector((state) => state.weather.locations.find(l => l.id === props.locationId));
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (props.locationId === 0 && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        dispatch(setCurrentLocationCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude}))
        dispatch(fetchLocation(props.locationId))
      });
      return
    }

    dispatch(fetchLocation(props.locationId))
  });

  return (
    <div>
      Latitude:{locationState?.latitude} Longitude:{locationState?.longitude}
    </div>
  );
};

export default LocationWeather;