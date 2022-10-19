import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import LocationWeatherTuple from '../src/components/LocationWeatherTuple'
import { useRouter } from 'next/router'

const Location: NextPage = () => {
  const router = useRouter()
  var locationId = Number(router.query.id)
  return (
    <Layout>
      <LocationWeatherTuple locationId={locationId} />
    </Layout>
  )
}

export default Location
