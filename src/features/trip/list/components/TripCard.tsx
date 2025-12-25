import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import {
  Card,
  CardActionArea,
  CardContent,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { AppRoutes } from '@config/routes';
import { Colors } from '@config/styles';
import { formatDate } from '@services/date';

import { TRIP_PREVIEW_IMAGES } from '../../data';
import type { Trip } from '../../types';

interface Props {
  trip: Trip;
}

export default function TripCard({ trip }: Props) {
  const previewImageUrl = TRIP_PREVIEW_IMAGES.find(
    (img) => img.id === trip.previewImage?.templateImageId,
  )?.src;

  return (
    <Card
      variant="outlined"
      sx={{ width: { xs: '100%', md: 330 }, borderRadius: 4 }}
    >
      <CardActionArea
        LinkComponent={Link}
        href={`${AppRoutes.trips}/${trip.id}`}
      >
        {previewImageUrl && (
          <img
            src={previewImageUrl}
            alt="Trip Preview Image"
            style={{
              display: 'block',
              width: '100%',
              height: 166,
              objectFit: 'cover',
              borderRadius: 16,
            }}
          />
        )}
        <CardContent>
          <Typography variant="h6" mb={2}>
            {trip.name}
          </Typography>
          <Stack gap={1}>
            <Stack direction="row" gap={1}>
              <EventIcon sx={{ color: Colors.secondaryBlue }} />
              <Typography variant="subtitle1" color="text.secondary">
                {formatDate(trip.startDate, 'DD MMM')} -{' '}
                {formatDate(trip.endDate, 'DD MMM, YYYY')}
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <PlaceIcon sx={{ color: Colors.secondaryBlue }} />
              <Typography variant="subtitle1" color="text.secondary">
                {trip.destinations[trip.destinations.length - 1].name}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}