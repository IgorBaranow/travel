import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Box, Link, Stack, TextField, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes/";
import AppButton from "@features/ui/AppButton";
import { auth } from "@services/firebase";
import { useAppDispatch, useAppSelector } from "@store/index";

import { registerUser } from "../store/authActions";
import { selectAuth, setUserName } from "../store/authSlice";

interface FormInput {
  name: string;
  email: string;
  password: string;
  PasswordConfirm: string;
}

export default function SignUpForm() {
  const auth = useAppSelector(selectAuth);
  const { handleSubmit, control, password, onSubmit } = useSignUpForm();

  if (auth.user) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Please specify your name!" }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            autoComplete="name"
            autoFocus
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3 }}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: "Please specify your email address!" }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            label="Email address"
            type="email"
            id="email"
            autoComplete="email"
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3 }}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: "Please specify your password!" }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3 }}
            {...field}
          />
        )}
      />
      <Controller
        name="PasswordConfirm"
        control={control}
        rules={{
          required: "Please confirm your password!",
          validate: (confirmPassword) =>
            confirmPassword !== password
              ? "Passwords doesn't match!"
              : undefined,
        }}
        render={({ field, fieldState }) => (
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="PasswordConfirm"
            autoComplete="confirm-password"
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: { xs: 3, md: 5 } }}
            {...field}
          />
        )}
      />

      <AppButton
        loading={auth.status === "loading"}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mb: 2 }}
      >
        Sign up
      </AppButton>
      <Stack
        direction="row"
        justifyContent={"center"}
        spacing={1}
        sx={{ width: "100%" }}
      >
        <Typography color="text.secondary">
          Do you have an account already?
        </Typography>
        <Link href={AppRoutes.login} variant="body2">
          Login
        </Link>
      </Stack>
    </Box>
  );
}

function useSignUpForm() {
  const { handleSubmit, control, watch } = useForm<FormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      PasswordConfirm: "",
    },
  });
  const dispatch = useAppDispatch();

  const password = watch("password");

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await dispatch(
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    ).unwrap();
    dispatch(setUserName(auth.currentUser?.displayName));
  };
  return {
    handleSubmit,
    control,
    password,
    onSubmit,
  };
}
