import { enqueueSnackbar } from "notistack";

import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

const isSnackbarMessage = (payload: unknown): payload is string => {
  return typeof payload === "string";
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const message = isSnackbarMessage(action.payload)
      ? action.payload
      : "An error occurred"; // Default message

    enqueueSnackbar(message, {
      variant: "error",
    });
  }
  return next(action);
};
