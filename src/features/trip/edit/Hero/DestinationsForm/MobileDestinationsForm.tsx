import {
  type Control,
  Controller,
  type FieldArrayWithId,
} from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import RoomIcon from '@mui/icons-material/Room';
import { ButtonBase, Stack, TextField, Typography } from '@mui/material';

import { Colors } from '@config/styles';
import AppDialog from '@features/ui/AppDialog';
import AppIconButton from '@features/ui/AppIconButton';
import useDialog from '@hooks/useDialog';

import { MAX_TRIP_DESTINATIONS } from '../../../constants';
import type { DestinationsFormInput } from './DestinationsForm';

interface Props {
  control: Control<DestinationsFormInput, unknown>;
  destinations: FieldArrayWithId<DestinationsFormInput, 'destinations', 'id'>[];
  removeDestination: (index: number) => void;
  addDestination: () => void;
}

export default function MobileDestinationsForm({
  control,
  destinations,
  removeDestination,
  addDestination,
}: Props) {
  const { isOpen, close, open } = useDialog();

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Stack
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            background: Colors.darkBlue,
            borderRadius: 1,
            p: 0.75,
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          <RoomIcon sx={{ color: 'white' }} />
        </Stack>
        <ButtonBase
          onClick={open}
          sx={{
            height: 36,
            textDecoration: 'underline',
            borderRadius: 1,
            px: 2,
            color: 'white',
          }}
        >
          <Typography variant="subtitle1">
            {destinations.length}{' '}
            {destinations.length > 1 ? 'destinations' : 'destination'}
          </Typography>
        </ButtonBase>
      </Stack>
      <AppDialog
        title="Your destinations"
        isOpen={isOpen}
        onClose={close}
        secondaryButtonText="Add Destination"
        onSecondaryButtonClick={addDestination}
        disableSecondaryButton={destinations.length >= MAX_TRIP_DESTINATIONS}
      >
        <Stack gap={3} sx={{ width: '100%' }}>
          <Controller
            name="locationFrom"
            control={control}
            rules={{ required: 'Please specify where your trip starts!' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                inputProps={{
                  maxLength: 25,
                }}
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
                rules={{ required: 'Please specify the destination!' }}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <TextField
                    inputProps={{
                      maxLength: 25,
                    }}
                    inputRef={ref}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id={`${destination}.${index}`}
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
      </AppDialog>
    </>
  );
}