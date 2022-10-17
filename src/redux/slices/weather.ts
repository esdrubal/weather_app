import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  locations: Array<WeatherLocation>
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
  locations: []
}

export const weatherSlice = createSlice({
  name: 'weather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetchCurrentLocation: (state) => {
      
    },
    addLocation: (state) => {
      
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