import { enqueueSnackbar } from "notistack";

import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    enqueueSnackbar(action.payload, {
      variant: "error",
    });
  }
  return next(action);
};
