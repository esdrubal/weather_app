import { useAppSelector, useAppDispatch } from '../redux/hooks';
import React, { useEffect } from 'react';
import styled from 'styled-components'
import LocationWeather from './LocationWeather'
import LocationWeatherForecast from './LocationWeatherForecast'
import SetCurrentLocationCoordinates from './SetCurrentLocationCoordinates'

interface Props {
  locationId: number
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;`

const Column = styled.div`
  flex-grow: 1;
  flex-basis: 50%;`

const LocationWeatherTuple: React.FC<Props> = (props) => {

  return (
    <Wrapper>
      { props.locationId === 0 &&
        <SetCurrentLocationCoordinates/>
      }
      <Column><LocationWeather locationId={props.locationId} /></Column>
      <Column><LocationWeatherForecast locationId={props.locationId} /></Column>
    </Wrapper>
  );
};

export default LocationWeatherTuple;