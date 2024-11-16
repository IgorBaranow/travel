import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Box, Link, Stack, TextField, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes/";
import AppButton from "@features/ui/AppButton";

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    // TODO: Login user through firebase
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%" }}
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: "Please specify email address!" }}
          render={({ field, fieldState }) => (
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: { xs: 3, mb: 5 }, mt: 0 }}
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
              sx={{ mb: { xs: 3, md: 5 }, mt: 0 }}
              {...field}
            />
          )}
        />

        <AppButton type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
          Login
        </AppButton>
        <Stack
          direction="row"
          justifyContent={"center"}
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Typography color="text.secondary">
            Don't have an account yet?
          </Typography>
          <Link href={AppRoutes.signUp} variant="body2">
            Sign Up
          </Link>
        </Stack>
      </Box>
    </>
  );
}
