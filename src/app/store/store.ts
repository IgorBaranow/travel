import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
