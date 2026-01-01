import { useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Breadcrumbs,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { AppRoutes } from '@config/routes';
import { Colors } from '@config/styles';
import AppButton from '@features/ui/AppButton';

import { useGetTripQuery, useUpdateTripMutation } from '../store/tripsApi';
import type { Trip } from '../types';
import Hero from './Hero';
import TripTabs from './Tabs/TripTabs';

export default function TripDetails() {
  const { tripId } = useParams();
  const {
    data: trip,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTripQuery(tripId);
  const [updateTrip] = useUpdateTripMutation();

  const onTripUpdate = (data: Partial<Trip>) => {
    updateTrip({ id: trip!.id, data });
  };

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
     return (
      <Stack>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={AppRoutes.trips}>
              Trips
            </Link>
            <Typography color={Colors.secondaryBlue} variant="subtitle2">
              {trip.name}
            </Typography>
          </Breadcrumbs>
          <AppButton endIcon={<DeleteIcon />} isSmall color="error">
            Delete
          </AppButton>
        </Stack>
        <Hero trip={trip} />
        <TripTabs trip={trip} onUpdate={onTripUpdate} />
      </Stack>
    );
  } else if (isError) {
    throw error;
  }

  return null;
}