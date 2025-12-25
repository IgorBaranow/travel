import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from '@features/auth/store/authSlice';
import tripWizardReducer from '@features/trip/add-trip/store/tripWizardSlice';
import { tripsApi } from '@features/trip/store/tripsApi';

import { rtkQueryErrorLogger } from './middleware/errorMiddleware';

const rootReducer = combineReducers({
  auth: authReducer,
  tripWizard: tripWizardReducer,
  [tripsApi.reducerPath]: tripsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tripWizard'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(tripsApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export const persistor = persistStore(store);