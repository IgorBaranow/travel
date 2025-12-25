import AddIcon from '@mui/icons-material/Add';
import { Box, Link, Stack, Typography } from '@mui/material';

import { AppRoutes } from '@config/routes';
import AppButton from '@features/ui/AppButton';

import TravelerImage from '../../assets/traveler.png';

export default function NoTrips() {
  return (
    <Stack gap={2} alignItems="center" sx={{ width: { xs: '100%', md: 445 } }}>
      <img
        src={TravelerImage}
        alt="Traveler with backpack"
        style={{ display: 'block', width: 360 }}
      />
      <Stack gap={3} sx={{ width: '100%' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" mb={{ xs: 1, md: 2 }}>
            No upcoming trips
          </Typography>
          <Typography color="text.secondary">
            Let's plan your next trip!
          </Typography>
        </Box>
        <AppButton
          LinkComponent={Link}
          fullWidth
          href={AppRoutes.addTrip}
          endIcon={<AddIcon />}
        >
          Go Travel
        </AppButton>
      </Stack>
    </Stack>
  );
}