import { Box, Stack, Typography } from '@mui/material';

import { usePreviewImageSrc } from '../hooks/usePreviewImageHook';
import type { Trip } from '../types';

interface Props {
  trip: Trip;
}

export default function Hero({ trip }: Props) {
  const previewImageSrc = usePreviewImageSrc(trip.previewImage);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        mt: 3,
        mb: { xs: 2, md: 3 },
        width: '100%',
        height: { xs: 181, md: 241 },
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${previewImageSrc}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        },
      }}
    >
      <Box style={{ position: 'relative' }}>
        <Typography variant="h2" color="white">
          {trip.name}
        </Typography>
      </Box>
    </Stack>
  );
}