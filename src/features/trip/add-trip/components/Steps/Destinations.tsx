import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, TextField } from "@mui/material";

import { MAX_TRIP_DESTINATIONS } from "@features/trip/constants";
import AppButton from "@features/ui/AppButton";
import AppIconButton from "@features/ui/AppIconButton";
import { useAppDispatch, useAppSelector } from "@store/index";

import type { Trip } from "../../../types";
import {
  nextStep,
  selectWizardTrip,
  setDestinations,
  setLocationFrom,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

interface FormInput {
  locationFrom: Trip["locationFrom"];
  destinations: Trip["destinations"];
}

export default function Destinations() {
  const {
    destinations,
    addDestination,
    handleSubmit,
    control,
    onSubmit,
    removeDestination,
  } = useDestinationsForm();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={2}
    >
      <Stack gap={3}>
        <Controller
          name="locationFrom"
          control={control}
          rules={{ required: "Please specify where your trip starts!" }}
          render={({ field: { ref, ...field }, fieldState }) => (
            <TextField
              autoFocus
              inputRef={ref}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="locationFrom"
              label="From"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              {...field}
            />
          )}
        />
        {destinations.map((destination, index) => (
          <Stack
            direction="row"
            gap={1}
            key={destination.id}
            alignItems="flex-end"
          >
            <Controller
              name={`destinations.${index}.name`}
              control={control}
              rules={{ required: "Please specify the destination!" }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <TextField
                  inputRef={ref}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id={`${"destination"}.${index}`}
                  label={`Destination ${index + 1}`}
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  {...field}
                />
              )}
            />
            {index !== 0 && (
              <AppIconButton
                onClick={() => removeDestination(index)}
                aria-label="Remove Destination"
              >
                <DeleteIcon />
              </AppIconButton>
            )}
          </Stack>
        ))}
      </Stack>
      {destinations.length < MAX_TRIP_DESTINATIONS && (
        <AppButton
          variant="text"
          onClick={addDestination}
          startIcon={<AddIcon />}
        >
          ADD DESTINATION
        </AppButton>
      )}
      <Pagination />
    </Stack>
  );
}

function useDestinationsForm() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      locationFrom: trip.locationFrom,
      destinations: trip.destinations,
    },
  });
  const {
    fields: destinations,
    append,
    remove,
  } = useFieldArray({ control, name: "destinations" });

  const addDestination = () => {
    append({ id: uuidv4(), name: "" });
  };

  const removeDestination = (index: number) => {
    remove(index);
  };
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setLocationFrom(data.locationFrom));
    dispatch(setDestinations(data.destinations));
    dispatch(nextStep());
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    destinations,
    addDestination,
    removeDestination,
  };
}
