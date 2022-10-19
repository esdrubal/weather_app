import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import LocationWeather from '../src/components/LocationWeather'
import { useRouter } from 'next/router'

const Location: NextPage = () => {
  const router = useRouter()
  var locationId = Number(router.query.id)
  return (
    <Layout>
      <LocationWeather locationId={locationId} />
    </Layout>
  )
}

export default Location
