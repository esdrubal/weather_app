import { configureStore, combineReducers } from '@reduxjs/toolkit'
import weatherReducer from './slices/weather'
import addLocationReducer from './slices/addLocation'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const rootPersistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  weather: weatherReducer,
  addLocation: addLocationReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch