import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {removeLocation} from '../redux/slices/weather'
import AddLocation from './AddLocation'
import Link from 'next/link'
import styled from 'styled-components'


interface Props {
}

const YourLocations = styled.div`
  font-weight:600;
  padding-top: 5pt;`

const LocationItem = styled.div`
  display: flex;
  cursor: pointer;
  width: 50%;
  &:hover {
    background-color: #f3eeeb;
  }`

const LinkStyled = styled.a`
  flex-grow: 1;
  padding: 2pt 4pt;`

const RemoveButton = styled.button`
  position: relative;
  float: right;
  height: 22px;`

const LocationWeatherList: React.FC<Props> = () => {
  
  const locationsState = useAppSelector((state) => state.weather.locations);
  const dispatch = useAppDispatch()

  const listItems = locationsState.filter(locationState => locationState.id !== 0).map(locationState => {
    return (
      <LocationItem key={locationState.id}>
        <Link href={{ pathname: '/location', query: { id: locationState.id } }}>
          <LinkStyled>{locationState.city} {locationState.country}</LinkStyled>
        </Link>
        <RemoveButton onClick={(e) => { dispatch(removeLocation(locationState.id)); e.preventDefault() }}>Remove</RemoveButton>
      </LocationItem>
    )});

  return (
    <div>
      <AddLocation />
      <YourLocations>Your Locations:</YourLocations>
      { listItems.length == 0 &&
        <a>You can add new locations by selecting a country, state and city above.</a>
      }
      {listItems}
    </div>
  );
};

export default LocationWeatherList;