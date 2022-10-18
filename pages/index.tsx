import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Provider, ReactReduxContext } from 'react-redux';
import {store} from '../src/redux/store';
import LocationWeather from '../src/components/LocationWeather'
import LocationWeatherList from '../src/components/LocationWeatherList'

const Home: NextPage = () => {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <div>
        <LocationWeather locationId={0} />
        <LocationWeatherList />
      </div>
    </Provider>
  )
}

export default Home
