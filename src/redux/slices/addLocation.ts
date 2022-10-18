import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AddLocationState {
  countryCode: string,
  stateCode: string,
  cityCode: string
}

// Define the initial state using that type
const initialState: AddLocationState = {
  countryCode: '',
  stateCode: '',
  cityCode: ''
}

export const slice = createSlice({
  name: 'addLocation',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    closeAddLocation: (state) => {
      state.countryCode = ''
      state.stateCode = ''
      state.cityCode = ''
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload
      state.stateCode = ''
      state.cityCode = ''
    },
    setStateCode: (state, action: PayloadAction<string>) => {
      state.stateCode = action.payload
      state.cityCode = ''
    },
    setCityCode: (state, action: PayloadAction<string>) => {
      state.cityCode = action.payload
    },
  },
})

export const { closeAddLocation, setCountryCode, setStateCode, setCityCode} = slice.actions

export default slice.reducer