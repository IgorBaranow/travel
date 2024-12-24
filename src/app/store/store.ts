import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/store/authSlice";
import tripWizardReducer from "@features/trip/add-trip/store/tripWizardSlice";

import { rtkQueryErrorLogger } from "./middleware/errorMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
  tripWizard: tripWizardReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tripWizard"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rtkQueryErrorLogger),
});

export const persistor = persistStore(store);
