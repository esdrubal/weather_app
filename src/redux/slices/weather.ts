import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Country, State, City } from "country-state-city";

interface WeatherLocation {
  id: number,
  latitude: number,
  longitude: number,
  city: string,
  country: string
}

// Define a type for the slice state
interface WeatherState {
  locationCounter: number,
  currentLocation: WeatherLocation,
  locations: Array<WeatherLocation>,
  lastLocationId: number
}

interface AddLocationPayload {
  countryCode: string,
  stateCode: string,
  cityCode: string
}

const defaultLocation: WeatherLocation = {
  id: 0,
  latitude: 38.7259284,
  longitude: -9.137382,
  city: '',
  country: ''
}

// Define the initial state using that type
const initialState: WeatherState = {
  locationCounter: 1,
  currentLocation: defaultLocation,
  locations: [defaultLocation],
  lastLocationId: 0
}

export const weatherSlice = createSlice({
  name: 'weather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetchCurrentLocation: (state) => {
      
    },
    addLocation: (state, action: PayloadAction<AddLocationPayload>) => {
      console.log('Add location')
      console.log(action)

      state.lastLocationId += 1

      const country = Country.getCountryByCode(action.payload.countryCode)!
      var longitude = 0
      var latitude = 0
      var cityName = ''
      console.log(country)
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
  },
})

export const { fetchCurrentLocation, addLocation, removeLocation } = weatherSlice.actions

export default weatherSlice.reducer