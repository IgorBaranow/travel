import {
  type Control,
  Controller,
  type FieldArrayWithId,
} from 'react-hook-form';

import AddIcon from '@mui/icons-material/Add';
import { Box, ButtonBase, FormHelperText, Input, Stack } from '@mui/material';

import { FontWeights } from '@config/styles';

import { MAX_TRIP_DESTINATIONS } from '../../../constants';
import type { DestinationsFormInput } from './DestinationsForm';

interface Props {
  control: Control<DestinationsFormInput, unknown>;
  destinations: FieldArrayWithId<DestinationsFormInput, 'destinations', 'id'>[];
  onDestinationInputKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => void;
  removeDestination: (index: number) => void;
  addDestination: () => void;
}

export default function DesktopDestinationsForm({
  control,
  destinations,
  onDestinationInputKeyDown,
  removeDestination,
  addDestination,
}: Props) {
  return (
    <Stack
      gap={3}
      direction="row"
      sx={{ height: 70 }}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        gap={1}
        alignItems="center"
        direction="row"
        sx={{ position: 'relative' }}
      >
        <Controller
          name="locationFrom"
          control={control}
          rules={{ required: 'Required!' }}
          render={({ field: { ref, ...field }, fieldState }) => (
            <Stack>
              <Input
                inputRef={ref}
                disableUnderline
                inputProps={{
                  'aria-label': 'Location From Name',
                  maxLength: 25,
                }}
                id="locationFrom"
                error={Boolean(fieldState.error)}
                sx={{
                  color: 'white',
                  width: `${field.value.length + 1}ch`,
                  maxWidth: 150,
                  minWidth: 60,
                  textDecoration: field.value.length ? 'underline' : 'none',
                  fontWeight: FontWeights.medium,
                }}
                {...field}
              />
              <FormHelperText
                error
                sx={{
                  maxWidth: 150,
                  position: 'absolute',
                  top: 44,
                  left: 0,
                }}
              >
                {fieldState.error?.message}
              </FormHelperText>
            </Stack>
          )}
        />
        <Box
          sx={{
            width: 10,
            height: 2,
            backgroundColor: 'white',
          }}
        />
      </Stack>
      {destinations.map((destination, index) => (
        <Stack
          key={destination.id}
          gap={1}
          alignItems="center"
          direction="row"
          sx={{ position: 'relative' }}
        >
          <Controller
            name={`destinations.${index}.name`}
            control={control}
            rules={{ required: 'Required!' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Stack>
                <Input
                  inputRef={ref}
                  disableUnderline
                  inputProps={{
                    'aria-label': 'Destination Name',
                    maxLength: 25,
                  }}
                  id={`${destination}.${index}`}
                  error={Boolean(fieldState.error)}
                  sx={{
                    width: `${field.value.length + 1}ch`,
                    color: 'white',
                    maxWidth: 150,
                    minWidth: 30,
                    textDecoration: field.value.length ? 'underline' : 'none',
                    fontWeight: FontWeights.medium,
                  }}
                  onKeyDown={(event) => onDestinationInputKeyDown(event, index)}
                  {...field}
                  onBlur={() => {
                    if (!field.value && destinations.length > 1) {
                      removeDestination(index);
                    }
                    field.onBlur();
                  }}
                />
                <FormHelperText
                  error
                  sx={{
                    maxWidth: 150,
                    position: 'absolute',
                    top: 44,
                    left: -20,
                  }}
                >
                  {fieldState.error?.message}
                </FormHelperText>
              </Stack>
            )}
          />
          {index !== MAX_TRIP_DESTINATIONS - 1 && (
            <Box
              sx={{
                width: 10,
                height: 2,
                backgroundColor: 'white',
              }}
            />
          )}
        </Stack>
      ))}
      {destinations.length < MAX_TRIP_DESTINATIONS && (
        <ButtonBase
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 1,
            borderColor: 'white',
            borderRadius: 1,
            height: 'fit-content',
          }}
          onClick={addDestination}
        >
          <AddIcon sx={{ color: 'white' }} />
        </ButtonBase>
      )}
    </Stack>
  );
}