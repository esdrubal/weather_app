import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {removeLocation} from '../redux/slices/weather'
import AddLocation from './AddLocation'

interface Props {
}

const LocationWeatherList: React.FC<Props> = () => {
  
  const locationsState = useAppSelector((state) => state.weather.locations);
  const dispatch = useAppDispatch()

  const listItems = locationsState.filter(locationState => locationState.id !== 0).map(locationState => <div key={locationState.id}>{locationState.city} {locationState.country} <button onClick={() => dispatch(removeLocation(locationState.id))}>Remove</button></div>);

  return (
    <div>
      Your Locations:<br/>
      <AddLocation />
      {listItems}
    </div>
  );
};

export default LocationWeatherList;