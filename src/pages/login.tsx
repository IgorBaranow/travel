import LoginForm from "@features/auth/LoginForm";
import { Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <div>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <LoginForm />;
    </div>
  );
}
