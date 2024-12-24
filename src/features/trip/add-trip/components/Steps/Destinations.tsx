import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Stack, TextField } from "@mui/material";

import { useAppSelector } from "@store/index";

import type { Trip } from "../../../types";
import { selectWizardTrip } from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

interface FormInput {
  locationFrom: Trip["locationFrom"];
}

export default function Destination() {
  const { handleSubmit, control, onSubmit } = useTravelInfoForm();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Controller
        name="locationFrom"
        control={control}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            inputRef={ref}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="locationFrom"
            label="locationFrom"
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
  const trip = useAppSelector(selectWizardTrip);
  const { handleSubmit, control, watch } = useForm<FormInput>({
    defaultValues: {
      locationFrom: trip.locationFrom,
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
