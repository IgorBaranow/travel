import { Outlet, useLocation } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import ErrorBoundary from '@config/routes/components/ErrorBoundary';
import LoginBackground from "@features/auth/assets/login-background.png";
import SignInBackground from "@features/auth/assets/sign-up-background.png";

import Logo from "../logo/Logo";

export default function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname == "/login";
  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: { md: "100vh" },
        maxHeight: { xs: "-webkit-fill-available", md: "auto" },
        height: { xs: "100vh", md: "auto" },
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url(${isLoginPage ? LoginBackground : SignInBackground})`,

          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopRightRadius: "56px",
          borderBottomRightRadius: "56px",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center ",
        }}
      >
        <Box
          sx={{
            height: "100%",
            mx: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "552px",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Logo />
          </Box>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Grid>
    </Grid>
  );
}
