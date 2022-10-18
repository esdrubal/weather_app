import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import LocationWeather from '../src/components/LocationWeather'

const Home: NextPage = () => {
  return (
    <Layout>
      <LocationWeather locationId={0} />
    </Layout>
  )
}

export default Home
