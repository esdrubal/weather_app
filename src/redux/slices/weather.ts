import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Country, State, City } from "country-state-city";

interface WeatherLocation {
  id: number,
  latitude: number,
  longitude: number,
  city: string,
  country: string
}

interface WeatherLocationDetails {
  locationId: number,
  timestamp: number,
  temperature: number,
  temperatureFeelsLike: number,
  temperatureMax: number,
  temperatureMin: number,
  description: string,
  humidity: number,
  airPressure: number,
  visibility: number
}

export interface WeatherLocationForecasts {
  locationId: number,
  forecasts: Array<WeatherLocationDetails>
}

// Define a type for the slice state
interface WeatherState {
  locationCounter: number,
  locations: Array<WeatherLocation>,
  locationsDetails: Array<WeatherLocationDetails>,
  locationsForecasts: Array<WeatherLocationForecasts>,
  lastLocationId: number
}

interface AddLocationPayload {
  countryCode: string,
  stateCode: string,
  cityCode: string
}

interface SetCoordinatesPayload {
  latitude: number,
  longitude: number
}

const defaultLocation: WeatherLocation = {
  id: 0,
  latitude: 38.7259284,
  longitude: -9.137382,
  city: 'Lisbon',
  country: 'Portugal'
}

// Define the initial state using that type
const initialState: WeatherState = {
  locationCounter: 1,
  locations: [defaultLocation],
  locationsDetails: [],
  locationsForecasts: [],
  lastLocationId: 0
}

export const weatherSlice = createSlice({
  name: 'weather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLocationDetails: (state, action: PayloadAction<WeatherLocationDetails>) => {
      const newLocations = state.locationsDetails.filter(locationDetails => locationDetails.locationId !== action.payload.locationId)
      newLocations.push(action.payload)
      state.locationsDetails = newLocations
    },
    setLocationForecasts: (state, action: PayloadAction<WeatherLocationForecasts>) => {
      const newLocations = state.locationsForecasts.filter(locationDetails => locationDetails.locationId !== action.payload.locationId)
      newLocations.push(action.payload)
      state.locationsForecasts = newLocations
    },
    addLocation: (state, action: PayloadAction<AddLocationPayload>) => {
      state.lastLocationId += 1

      const country = Country.getCountryByCode(action.payload.countryCode)!
      var longitude = 0
      var latitude = 0
      var cityName = ''

      if(action.payload.stateCode === '') {
        longitude = Number(country.longitude)
        latitude = Number(country.latitude)
      } else {
        const countryState = State.getStateByCodeAndCountry(action.payload.stateCode, action.payload.countryCode)!
        if(action.payload.cityCode === '') {
          cityName = countryState.name
          longitude = Number(countryState.longitude)
          latitude = Number(countryState.latitude)
        } else {
          cityName = action.payload.cityCode
          const city = City.getCitiesOfState(action.payload.countryCode, action.payload.stateCode)!.find(city => city.name === cityName)!
          longitude = Number(city.longitude)
          latitude = Number(city.latitude)
        }
      }
      
      const newLocation: WeatherLocation = {
        id: state.lastLocationId,
        country: country.name,
        city: cityName,
        longitude: longitude,
        latitude: latitude
      }

      state.locations.push(newLocation)
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeLocation: (state, action: PayloadAction<number>) => {
      const newLocations = state.locations.filter(location => location.id !== action.payload)
      state.locations = newLocations
    },
    setCurrentLocationCoordinates: (state, action: PayloadAction<SetCoordinatesPayload>) => {
      const currentLocation = state.locations.find(location => location.id === 0)!
      currentLocation.longitude = action.payload.longitude
      currentLocation.latitude = action.payload.latitude
    },
  },
})

export const { setLocationDetails, setLocationForecasts, addLocation, removeLocation, setCurrentLocationCoordinates } = weatherSlice.actions

export default weatherSlice.reducer