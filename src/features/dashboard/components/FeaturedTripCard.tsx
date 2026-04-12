import { Fragment } from 'react';

import EventIcon from '@mui/icons-material/Event';
import PaidIcon from '@mui/icons-material/Paid';
import RoomIcon from '@mui/icons-material/Room';
import { Box, ButtonBase, Chip, Link, Stack, Typography } from '@mui/material';

import { AppRoutes } from '@config/routes';
import { Colors, FontWeights, theme } from '@config/styles';
import { usePreviewImageSrc } from '@features/trip/hooks/usePreviewImageSrc';
import type { Trip } from '@features/trip/types';
import { getTripTotalBudget } from '@features/trip/utils/getTripTotalBudget';
import { formatDate } from '@services/date';

interface Props {
  trip: Trip;
}

export default function FeaturedTripCard({ trip }: Props) {
  const previewImageSrc = usePreviewImageSrc(trip.previewImage);
  const tripTotalBudget = getTripTotalBudget(trip.expenses);

  return (
    <ButtonBase
      href={`${AppRoutes.trips}/${trip.id}`}
      LinkComponent={Link}
      sx={{
        background: 'white',
        borderRadius: 4,
        width: '100%',
        p: { xs: 2, md: 3 },
      }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        gap={{ xs: 2, md: 3 }}
        sx={{
          width: '100%',
        }}
      >
        <Box
          sx={{
            minWidth: { lg: 322 },
            width: { xs: '100%', lg: 322 },
            height: { xs: 258, lg: 267 },
          }}
        >
          {previewImageSrc && (
            <img
              src={previewImageSrc}
              alt="Trip Preview Image"
              style={{
                display: 'block',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
            />
          )}
        </Box>
        <Stack gap={2}>
          <Stack
            gap={2}
            justifyContent={{ xs: 'space-between', md: 'flex-start' }}
            direction="row"
            alignItems="center"
          >
            <Typography variant="h6">{trip.name}</Typography>
            <Chip
              label="Upcoming"
              sx={{
                backgroundColor: Colors.lightOrange,
                color: Colors.orange,
                fontSize: theme.typography.caption.fontSize,
                lineHeight: theme.typography.caption.lineHeight,
              }}
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                background: Colors.lightBlue,
                borderRadius: 1,
                p: 0.75,
                width: 'fit-content',
                height: 'fit-content',
              }}
            >
              <RoomIcon sx={{ color: Colors.secondaryBlue }} />
            </Stack>
            <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
              <Typography
                sx={{
                  fontWeight: FontWeights.medium,
                  textDecoration: 'underline',
                }}
              >
                {trip.locationFrom}
              </Typography>
              {trip.destinations.map((destination) => (
                <Fragment key={destination.id}>
                  <Box
                    sx={{
                      width: 10,
                      height: '0.06rem',
                      backgroundColor: 'text.primary',
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: FontWeights.medium,
                      textDecoration: 'underline',
                    }}
                  >
                    {destination.name}
                  </Typography>
                </Fragment>
              ))}
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Typography color="text.secondary">Details</Typography>
            <Stack direction="row" alignItems="center">
              <EventIcon
                fontSize="large"
                sx={{ color: Colors.secondaryBlue, mr: 1 }}
              />
              <Typography variant="body2" mr={2}>
                {formatDate(trip.startDate, 'DD MMM')} -{' '}
                {formatDate(trip.endDate, 'DD MMM')}
              </Typography>
              <PaidIcon
                fontSize="large"
                sx={{ color: Colors.secondaryBlue, mr: 1 }}
              />
              <Typography variant="body2">${tripTotalBudget}</Typography>
            </Stack>
          </Stack>
          <Typography
            sx={{
              display: { xs: 'none', md: '-webkit-box' },
              overflow: 'hidden',
              lineClamp: '3',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {trip.description}
          </Typography>
        </Stack>
      </Stack>
    </ButtonBase>
  );
}