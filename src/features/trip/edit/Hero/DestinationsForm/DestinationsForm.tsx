import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { type UseFormWatch, useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useBreakpoints } from '@hooks/useBreakpoints';

import type { Trip } from '../../../types';
import DesktopDestinationsForm from './DesktopDestinationsForm';
import MobileDestinationsForm from './MobileDestinationsForm';

interface Props {
  trip: Trip;
  onChange: (newValues: {
    locationFrom: Trip['locationFrom'];
    destinations: Trip['destinations'];
  }) => void;
}

export interface DestinationsFormInput {
  locationFrom: Trip['locationFrom'];
  destinations: Trip['destinations'];
}

export default function DestinationsForm(props: Props) {
  const { md } = useBreakpoints();
  const {
    destinations,
    addDestination,
    control,
    onDestinationInputKeyDown,
    removeDestination,
  } = useDestinationsForm(props);

  return (
    <>
      {!md && (
        <MobileDestinationsForm
          destinations={destinations}
          addDestination={addDestination}
          control={control}
          removeDestination={removeDestination}
        />
      )}
      {md && (
        <DesktopDestinationsForm
          destinations={destinations}
          addDestination={addDestination}
          control={control}
          onDestinationInputKeyDown={onDestinationInputKeyDown}
          removeDestination={removeDestination}
        />
      )}
    </>
  );
}

function useDestinationsForm({ trip, onChange }: Props) {
  const { control, setFocus, watch } = useForm<DestinationsFormInput>({
    mode: 'onBlur',
    defaultValues: {
      locationFrom: trip.locationFrom,
      destinations: trip.destinations,
    },
  });
  const formValues = watch();
  const {
    fields: destinations,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'destinations',
  });

  const removeDestination = (index: number) => {
    remove(index);
    setFocus(`destinations.${index - 1}.name`);
  };

  const addDestination = () => {
    append({ id: uuidv4(), name: '' });
  };

  const onDestinationInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace') {
      if (
        formValues.destinations[index].name.length === 0 &&
        formValues.destinations.length > 1
      ) {
        event.preventDefault();
        removeDestination(index);
      }
    }
  };

  useWatchChange(watch, onChange);

  return {
    control,
    destinations,
    addDestination,
    onDestinationInputKeyDown,
    removeDestination,
  };
}

function useWatchChange(
  watch: UseFormWatch<DestinationsFormInput>,
  onChange?: (newValues: {
    locationFrom: Trip['locationFrom'];
    destinations: Trip['destinations'];
  }) => void,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateDebounced = useCallback(
    debounce(
      (data: {
        locationFrom: Trip['locationFrom'];
        destinations: Trip['destinations'];
      }) => {
        onChange?.(data);
      },
      500,
    ),
    [],
  );

  useEffect(() => {
    const formUpdateSubscription = watch((newValues) => {
      const isLocationFromValid = Boolean(newValues.locationFrom?.length);
      const isDestinationsListValid =
        Boolean(newValues.destinations?.length) &&
        newValues.destinations?.every((destination) =>
          Boolean(destination?.name),
        );

      if (isLocationFromValid && isDestinationsListValid) {
        onUpdateDebounced({
          locationFrom: newValues.locationFrom as Trip['locationFrom'],
          destinations: newValues.destinations as Trip['destinations'],
        });
      }
    });

    return () => formUpdateSubscription.unsubscribe();
  }, [onUpdateDebounced, watch]);
}