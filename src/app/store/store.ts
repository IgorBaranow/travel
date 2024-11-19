import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/store/authSlice";

import { rtkQueryErrorLogger } from "./middleware/errorMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  //Add created by me middleware to all default middleware that are in the store. getDefaultMiddleware is responsible for all middlewares, so that why I use this option to add my own middleware to all middleware, not setting my middleware as only one option
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
});
