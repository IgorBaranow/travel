import { useParams } from 'react-router-dom';

import { CircularProgress, Stack } from '@mui/material';

import { useGetTripDetailsQuery } from '../store/tripsApi';

export default function TripDetails() {
  const { tripId } = useParams();
  const {
    data: trip,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTripDetailsQuery(tripId);

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    return <>{trip.name}</>;
  } else if (isError) {
    throw error;
  }

  return null;
}