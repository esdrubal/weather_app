import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import LocationWeatherTuple from '../src/components/LocationWeatherTuple'

const Home: NextPage = () => {
  return (
    <Layout>
      <LocationWeatherTuple locationId={0} />
    </Layout>
  )
}

export default Home
