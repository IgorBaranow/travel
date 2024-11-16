import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Box, Link, Stack, TextField, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes/";
import AppButton from "@features/ui/AppButton";

interface FormInput {
  name: string;
  email: string;
  password: string;
  PasswordConfirm: string;
}

export default function SignUpForm() {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    // DOTO: Register user with firebase
  };

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
            sx={{ mb: 3, mt: 0 }}
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
            sx={{ mb: 3, mt: 0 }}
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
            sx={{ mb: 3, mt: 0 }}
            {...field}
          />
        )}
      />
      <Controller
        name="PasswordConfirm"
        control={control}
        rules={{ required: "Please confirm your password!" }}
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
            sx={{ mb: { xs: 3, md: 5 }, mt: 0 }}
            {...field}
          />
        )}
      />

      <AppButton type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
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
