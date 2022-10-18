import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './slices/weather'
import addLocationReducer from './slices/addLocation'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    addLocation: addLocationReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch