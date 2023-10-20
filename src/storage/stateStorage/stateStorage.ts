import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './stateSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const STATE_HYDRATION_TIMEOUT = 300;

const persistConfig = {
  key: 'root',
  timeout: STATE_HYDRATION_TIMEOUT,
  version: 1,
  storage,
};

const reducer = combineReducers({
  accountState: stateReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
