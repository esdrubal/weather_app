import { useAppSelector, useAppDispatch } from '../redux/hooks';
import React, { useEffect } from 'react';


interface Props {
  locationId: number
}

const LocationWeather: React.FC<Props> = (props) => {
  
  const locationState = useAppSelector((state) => state.weather.locations.find(l => l.id == props.locationId));
  const dispatch = useAppDispatch()


  useEffect(() => {
  });

  return (
    <div>
      Latitude:{locationState?.latitude} Longitude:{locationState?.longitude}
    </div>
  );
};

export default LocationWeather;