import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { AppRouter } from "@config/routes";
import { theme } from "@config/styles";
import { useAuthStateSubscription } from "@services/firebase";

export default function App() {
  useAuthStateSubscription();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <AppRouter />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
