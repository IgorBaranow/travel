import { Box, CircularProgress, Link, Stack, Typography } from '@mui/material';

import { AppRoutes } from '@config/routes';
import NoTrips from '@features/trip/list/components/NoTrips';
import TripsList from '@features/trip/list/components/TripsList';
import { useGetTripsQuery } from '@features/trip/store/tripsApi';
import AppButton from '@features/ui/AppButton';

import FeaturedTripCard from './FeaturedTripCard';
import Hero from './Hero/Hero';
import NewTripForm from './NewTripForm';

export default function Dashboard() {
  const { data: trips, isLoading, isSuccess } = useGetTripsQuery({ limit: 3 });

  let tripsContent;
  if (isLoading) {
    tripsContent = (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess && trips.length > 0) {
    const featuredTrip = trips[0];
    tripsContent = (
      <Box>
        <Typography variant="h4" mb={{ xs: 2, md: 3 }}>
          Your Upcoming Trip
        </Typography>
        <FeaturedTripCard trip={featuredTrip} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={{ xs: 2, md: 3 }}
          mt={3}
        >
          <Typography variant="h4">Your Trips</Typography>
          <AppButton
            variant="text"
            LinkComponent={Link}
            href={AppRoutes.trips}
            sx={{
              textTransform: 'uppercase',
            }}
          >
            See all
          </AppButton>
        </Stack>
        <TripsList trips={trips} />
      </Box>
    );
  } else if (isSuccess && trips.length === 0) {
    tripsContent = (
      <Stack
        justifyContent={{ xs: 'flex-start', md: 'center' }}
        alignItems="center"
        sx={{ width: '100%', height: { xs: 'auto', md: '100%' } }}
      >
        <NoTrips hideCTA />
      </Stack>
    );
  }

  return (
    <Stack>
      <Hero />
      <NewTripForm />
      {tripsContent}
    </Stack>
  );
}