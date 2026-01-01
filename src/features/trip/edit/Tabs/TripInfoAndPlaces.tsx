import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { Controller, type UseFormWatch, useForm } from 'react-hook-form';

import PaidIcon from '@mui/icons-material/Paid';
import { InputLabel, Stack, TextField, Typography } from '@mui/material';

import { Colors } from '@config/styles';
import PlacesForm from '@features/trip/components/PlacesForm';
import DateSelectInput from '@features/ui/form/DateSelectInput';

import type { Trip } from '../../types';
import ContentCard from './ContentCard';

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

interface FormInput {
  name: Trip['name'];
  description: Trip['description'];
  startDate: Trip['startDate'];
  endDate: Trip['endDate'];
}

export default function TripInfoAndPlaces(props: Props) {
  const totalBudget = 360;
  const { control, formValues } = useTravelInfoForm(props);

  const onPlacesUpdate = (newPlaces: Trip['places']) =>
    props.onUpdate({ places: newPlaces });

  return (
    <Stack gap={3}>
      <ContentCard title="Trip Details">
        <Stack component="form" noValidate sx={{ width: '100%' }} gap={3}>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={3}>
            <Stack sx={{ width: '100%' }} gap={3}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Please specify trip name!' }}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <TextField
                    inputRef={ref}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Trip Name"
                    helperText={fieldState.error?.message}
                    error={Boolean(fieldState.error)}
                    {...field}
                  />
                )}
              />
              <Stack direction="row" gap={2}>
                <DateSelectInput
                  label="Start date"
                  name="startDate"
                  control={control}
                  requireErrorText="Please specify start date!"
                  maxDate={formValues.endDate}
                  sx={{ svg: { color: Colors.secondaryBlue }, maxWidth: 150 }}
                />
                <DateSelectInput
                  label="End date"
                  name="endDate"
                  control={control}
                  requireErrorText="Please specify end date!"
                  minDate={formValues.startDate}
                  sx={{ svg: { color: Colors.secondaryBlue }, maxWidth: 150 }}
                />
                <Stack gap={0.5}>
                  <InputLabel
                    sx={{ fontSize: '0.875rem', lineHeight: '1.313rem' }}
                  >
                    Budget
                  </InputLabel>
                  <Stack direction="row" gap={1}>
                    <PaidIcon sx={{ color: Colors.secondaryBlue }} />
                    <Typography variant="subtitle1">${totalBudget}</Typography>
                  </Stack>
                </Stack>
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
        </Stack>
      </ContentCard>
      <ContentCard title="Places">
        <PlacesForm
          defaultPlaces={props.trip.places}
          onChange={onPlacesUpdate}
        />
      </ContentCard>
    </Stack>
  );
}

function useTravelInfoForm({ trip, onUpdate }: Props) {
  const { control, watch } = useForm<FormInput>({
    mode: 'onChange',
    defaultValues: {
      name: trip.name,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
    },
  });
  const formValues = watch();

  useWatchChange(watch, onUpdate);

  return {
    control,
    formValues,
  };
}

function useWatchChange(
  watch: UseFormWatch<FormInput>,
  onUpdate: (data: Partial<Trip>) => void,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateDebounced = useCallback(
    debounce((data: Partial<Trip>) => {
      onUpdate(data);
    }, 500),
    [],
  );

  useEffect(() => {
    const formUpdateSubscription = watch((newValues) => {
      if (newValues.name && newValues.startDate && newValues.endDate) {
        onUpdateDebounced(newValues);
      }
    });

    return () => formUpdateSubscription.unsubscribe();
  }, [onUpdateDebounced, watch]);
}