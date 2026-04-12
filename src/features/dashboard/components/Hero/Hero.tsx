import { Box, Stack, Typography } from '@mui/material';

import { theme } from '@config/styles';
import { selectUser } from '@features/auth/store/authSlice';
import { useAppSelector } from '@store/index';

import PlaneIcon from './PlaneIcon';

export default function Hero() {
  const user = useAppSelector(selectUser);

  return (
    <Stack
      sx={{
        position: 'relative',
        bgcolor: 'primary.main',
        width: { xs: 'calc(100% + 2rem)', md: '100%' },
        height: { xs: 237, md: 212 },
        borderRadius: 4,
        borderTopRightRadius: { xs: 0, md: theme.shape.borderRadius * 4 },
        borderTopLeftRadius: { xs: 0, md: theme.shape.borderRadius * 4 },
        color: 'white',
        textAlign: { xs: 'center', md: 'left' },
        overflowX: 'hidden',
        p: 6,
        pt: { xs: 7.9, md: 6 },
        ml: { xs: -2, md: 0 },
        mt: { xs: -8.7, md: 0 },
      }}
    >
      <Typography variant="h1" component="h2" mb={{ xs: 1, md: 2 }}>
        Hi, {user?.displayName}
      </Typography>
      <Typography variant="h6">Let's plan your next trip!</Typography>
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '-25%', md: '-18%' },
          left: { xs: 70, md: '17.2%' },
          width: { xs: 320, md: '100%' },
          maxWidth: { xs: '100%', md: '65%' },
          zIndex: theme.zIndex.appBar + 1,
        }}
      >
        <PlaneIcon />
      </Box>
    </Stack>
  );
}