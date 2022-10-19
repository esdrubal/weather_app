import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {removeLocation} from '../redux/slices/weather'
import AddLocation from './AddLocation'
import Link from 'next/link';
import styled from 'styled-components'

interface Props {
}

const LinkStyled = styled.a`
  cursor: pointer;
  padding: 2pt 4pt;`

const LocationWeatherList: React.FC<Props> = () => {
  
  const locationsState = useAppSelector((state) => state.weather.locations);
  const dispatch = useAppDispatch()

  const listItems = locationsState.filter(locationState => locationState.id !== 0).map(locationState => {
    return (
      <div key={locationState.id}>
        <Link href={{ pathname: '/location', query: { id: locationState.id } }}>
          <LinkStyled>{locationState.city} {locationState.country}</LinkStyled>
        </Link>
        <button onClick={() => dispatch(removeLocation(locationState.id))}>Remove</button>
      </div>
    )});

  return (
    <div>
      Your Locations:<br/>
      <AddLocation />
      {listItems}
    </div>
  );
};

export default LocationWeatherList;