import { useEffect } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import AddIcon from '@mui/icons-material/Add';
import { Stack, TextField } from '@mui/material';

import { AppRoutes } from '@config/routes';
import {
  selectWizardTrip,
  setDestinations,
  setLocationFrom,
  setTravelInformation,
} from '@features/trip/add-trip/store/tripWizardSlice';
import type { Trip } from '@features/trip/types';
import AppButton from '@features/ui/AppButton';
import DateSelectInput from '@features/ui/form/DateSelectInput';
import { useAppDispatch, useAppSelector } from '@store/index';

interface FormInput {
  locationFrom: Trip['locationFrom'];
  locationTo: string;
  startDate: Trip['startDate'];
  endDate: Trip['endDate'];
}

export default function NewTripForm() {
  const { handleSubmit, control, onSubmit, formValues } = useNewTripForm();

  return (
    <Stack
      component="form"
      direction={{ xs: 'column', lg: 'row' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      gap={{ xs: 3, md: 2 }}
      sx={{
        mx: 'auto',
        width: { xs: '100%', md: '80.5%' },
        mt: { xs: -10.2, md: -4 },
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        backgroundColor: 'white',
        zIndex: 1,
        mb: { xs: 1, md: 3 },
      }}
    >
      <Controller
        name="locationFrom"
        control={control}
        rules={{ required: 'Please specify where your trip starts!' }}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
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
      <Controller
        name="locationTo"
        control={control}
        rules={{ required: 'Please specify where are you going!' }}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            inputRef={ref}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="locationTo"
            label="To"
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            {...field}
          />
        )}
      />
      <Stack gap={2} direction="row">
        <DateSelectInput
          label="Start date"
          name="startDate"
          control={control}
          requireErrorText="Please specify start date!"
          maxDate={formValues.endDate}
          validate={{
            startDate: (startDate) =>
              !startDate ||
              (startDate &&
                formValues.endDate &&
                startDate < formValues.endDate)
                ? undefined
                : 'Start date should be before end date!',
          }}
          sx={{ minWidth: { md: 144 }, width: { xs: '100%', xl: 204 } }}
        />
        <DateSelectInput
          label="End date"
          name="endDate"
          control={control}
          requireErrorText="Please specify end date!"
          minDate={formValues.startDate}
          validate={{
            endDate: (endDate) =>
              !endDate ||
              (endDate &&
                formValues.startDate &&
                formValues.startDate < endDate)
                ? undefined
                : 'End date should be after start date!',
          }}
          sx={{ minWidth: { md: 144 }, width: { xs: '100%', xl: 204 } }}
        />
      </Stack>
      <AppButton
        endIcon={<AddIcon />}
        fullWidth
        type="submit"
        sx={{ minWidth: 170 }}
      >
        Go Travel
      </AppButton>
    </Stack>
  );
}

function useNewTripForm() {
  const navigate = useNavigate();
  const trip = useAppSelector(selectWizardTrip);
  const dispatch = useAppDispatch();
  const { handleSubmit, control, watch, trigger } = useForm<FormInput>({
    defaultValues: {
      startDate: trip.startDate,
      endDate: trip.endDate,
      locationFrom: trip.locationFrom,
      locationTo: trip.destinations[0].name,
    },
  });
  const formValues = watch();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(
      setTravelInformation({
        startDate: data.startDate,
        endDate: data.endDate,
        name: trip.name,
        previewImage: trip.previewImage,
        description: trip.description,
      }),
    );
    dispatch(setLocationFrom(data.locationFrom));
    dispatch(setDestinations([{ id: uuidv4(), name: data.locationTo }]));
    navigate(AppRoutes.addTrip);
  };

  useEffect(() => {
    if (formValues.startDate && formValues.endDate) {
      trigger('startDate');
      trigger('endDate');
    }
  }, [formValues.startDate, formValues.endDate, trigger]);

  return {
    handleSubmit,
    control,
    onSubmit,
    formValues,
  };
}