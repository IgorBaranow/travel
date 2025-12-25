import { Stack } from '@mui/material';

import type { Trip } from '../../types';
import TripCard from './TripCard';

interface Props {
  trips: Trip[];
}

export default function TripsList({ trips }: Props) {
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </Stack>
  );
}