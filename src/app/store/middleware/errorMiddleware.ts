import { enqueueSnackbar } from "notistack";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  // Это Type Guard: внутри if TypeScript уже знает, что у action есть поля payload и error.
  if (isRejectedWithValue(action)) {
    // В RTK Query payload часто содержит ответ сервера целиком.
    const payload = action.payload as { data?: { message?: string }; message?: string } | string | undefined;

    // payload.data.message (обычно ответ бэкенда при ошибке 4xx/5xx)
    // payload.message (иногда встречается)
    // payload (если сервер вернул просто строку)
    // action.error.message (стандартное сообщение об ошибке HTTP, например "Rejected")
    const errorMessage = 
      (typeof payload === 'object' && payload?.data?.message) ||
      (typeof payload === 'object' && payload?.message) || 
      (typeof payload === 'string' ? payload : null) ||
      action.error.message ||
      'Something went wrong!';

    enqueueSnackbar(errorMessage, {
      variant: 'error',
    });
  }

  return next(action);
};