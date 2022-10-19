import { useAppDispatch } from '../redux/hooks';
import React, { useEffect } from 'react';
import { setCurrentLocationCoordinates } from '../redux/slices/weather'

interface Props {
}

const SetCurrentLocationCoordinates: React.FC<Props> = (props) => {
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        dispatch(setCurrentLocationCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude}))
      });
    }
  });

  return (
    <div/> 
  )
};

export default SetCurrentLocationCoordinates;