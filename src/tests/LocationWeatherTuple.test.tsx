import React from 'react'
import {waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import LocationWeatherTuple from '../components/LocationWeatherTuple'
import {defaultLocation} from '../redux/slices/weather'
import {renderWithProviders} from './testUtils'
import {round} from '../helpers'

test('displays default latitude and longitude', async () => {
  const { container } = renderWithProviders(<LocationWeatherTuple locationId={0} />)

  expect(container).toHaveTextContent(defaultLocation.city+', '+defaultLocation.country)
  expect(container).toHaveTextContent('Latitude:'+round(defaultLocation.latitude,4))
  expect(container).toHaveTextContent('Longitude:'+round(defaultLocation.longitude, 4))
  })

test('displays custom latitude and longitude', async () => {
  const coords = {
    latitude: 38.5667,
    longitude: -7.9
  }
  const mockGeolocation = {
    getCurrentPosition: jest.fn()
      .mockImplementationOnce((success) => Promise.resolve(success({
        coords: coords
      })))
  };
  // @ts-ignore
  global.navigator.geolocation = mockGeolocation;

  const { container } = renderWithProviders(<LocationWeatherTuple locationId={0} />)

  await waitFor(() => {
    expect(container).toHaveTextContent('Évora, PT')
    expect(container).toHaveTextContent('Latitude:'+coords.latitude)
    expect(container).toHaveTextContent('Longitude:'+coords.longitude)
  }, {timeout: 500}) 
  })