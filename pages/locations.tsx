import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import LocationWeatherList from '../src/components/LocationWeatherList'

const Locations: NextPage = () => {
  return (
    <Layout>
      <LocationWeatherList />
    </Layout>
  )
}

export default Locations
