import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import LocationWeatherList from '../src/components/LocationWeatherList'

const Home: NextPage = () => {
  return (
    <Layout>
      <LocationWeatherList />
    </Layout>
  )
}

export default Home
