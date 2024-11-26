import { Typography } from "@mui/material";

import { APP_NAME } from "@config/constants";
import LoginForm from "@features/auth/components/LoginForm";

export default function LoginPage() {
<<<<<<< HEAD
  return <div>Login</div>;
=======
  return (
    <>
      <Typography component="h1" variant="h2" mb={1}>
        Login
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Login to access {APP_NAME}
      </Typography>
      <LoginForm />
    </>
  );
>>>>>>> 378973ee0c5f5e5884d4d14fa6f7512f3e954475
}
