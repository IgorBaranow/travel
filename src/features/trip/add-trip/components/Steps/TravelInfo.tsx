import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { ButtonBase, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { Colors } from "@config/styles";

import Pagination from "../Navigation/Pagination";

interface FormInput {
  previewImage: string | null;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}

export default function LoginForm() {
  const { handleSubmit, control, onSubmit, formValues } = useTravelInfoForm();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%", mt: 6 }}
      gap={3}
    >
      <Stack direction={{ xs: "column", md: "row" }} gap={3}>
        <ButtonBase
          sx={{
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 0.5,
            height: 152,
            minWidth: { xs: "100%", md: 152 },
            border: 1,
            borderColor: "text.secondary",
          }}
        >
          <ImageSearchIcon sx={{ color: Colors.disabled }} />
          <Typography variant="subtitle1" color={Colors.disabled}>
            Preview image
          </Typography>
        </ButtonBase>
        <Stack sx={{ width: "100%" }} gap={3}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Please specify trip name!" }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                inputRef={ref}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Trip Name"
                autoFocus
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
          <Stack direction="row" gap={2}>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Please specify start date!" }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <DatePicker
                  label="Start date"
                  slotProps={{
                    textField: {
                      inputRef: ref,
                      variant: "standard",
                      helperText: fieldState.error?.message,
                      error: Boolean(fieldState.error),
                    },
                    inputAdornment: { position: "start" },
                  }}
                  {...field}
                  sx={{
                    width: "100%",
                    "& .MuiSvgIcon-root": { ml: 0.1 },
                  }}
                  maxDate={formValues.endDate}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              rules={{ required: "Please specify end date!" }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <DatePicker
                  label="End date"
                  slotProps={{
                    textField: {
                      inputRef: ref,
                      variant: "standard",
                      helperText: fieldState.error?.message,
                      error: Boolean(fieldState.error),
                    },
                    inputAdornment: { position: "start" },
                  }}
                  {...field}
                  sx={{ width: "100%" }}
                  minDate={formValues.startDate}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
      <Controller
        name="description"
        control={control}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            inputRef={ref}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            multiline
            maxRows={6}
            inputProps={{ maxLength: 200 }}
            helperText={
              fieldState.error?.message ?? `${field.value.length}/200`
            }
            error={Boolean(fieldState.error)}
            {...field}
          />
        )}
      />
      <Pagination />
    </Stack>
  );
}

function useTravelInfoForm() {
  const { handleSubmit, control, watch } = useForm<FormInput>({
    defaultValues: {
      name: "",
      description: "",
      startDate: null,
      endDate: null,
    },
  });
  const formValues = watch();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    // TODO: Save step info
    console.log(data);
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    formValues,
  };
}
