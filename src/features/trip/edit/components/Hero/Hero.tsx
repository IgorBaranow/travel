import ModeIcon from '@mui/icons-material/Mode';
import { Stack, Typography } from '@mui/material';

import AppButton from '@features/ui/AppButton';
import useDialog from '@hooks/useDialog';

import PreviewImageDialog from '../../../components/PreviewImageDialog';
import { usePreviewImageSrc } from '../../../hooks/usePreviewImageSrc';
import type { PreviewImage, Trip } from '../../../types';
import DestinationsForm from './DestinationsForm/DestinationsForm';

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

export default function Hero({ trip, onUpdate }: Props) {
  const { isOpen, close, open } = useDialog();
  const previewImageSrc = usePreviewImageSrc(trip.previewImage);

  const onDestinationsUpdate = (newValues: {
    locationFrom: Trip['locationFrom'];
    destinations: Trip['destinations'];
  }) => {
    onUpdate({ ...newValues });
  };

  const onPreviewImageSave = (
    previewImage: PreviewImage | null,
    shouldClose: boolean,
  ) => {
    if (shouldClose) {
      close();
    }

    if (previewImage) {
      onUpdate({ previewImage });
    }
  };

  return (
    <>
      <Stack
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
        <AppButton
          onClick={open}
          variant="outlined"
          endIcon={<ModeIcon />}
          sx={{
            mt: 2,
            mr: { md: 2 },
            mb: 3,
            alignSelf: { xs: 'center', md: 'flex-end' },
            borderColor: 'white',
            background: 'transparent',
            color: 'white',
            '&:hover': {
              borderColor: 'white',
            },
          }}
        >
          Edit Preview
        </AppButton>
        <Stack
          alignItems="center"
          gap={{ xs: 1, md: 2 }}
          sx={{ position: 'relative', width: '100%' }}
        >
          <Typography variant="h2" color="white">
            {trip.name}
          </Typography>
          <DestinationsForm trip={trip} onChange={onDestinationsUpdate} />
        </Stack>
      </Stack>
      <PreviewImageDialog
        key={previewImageSrc}
        tripId={trip.id}
        isOpen={isOpen}
        onClose={close}
        onSave={(previewImage) => onPreviewImageSave(previewImage, true)}
        defaultPreviewImage={trip.previewImage}
        defaultPreviewImageSrc={previewImageSrc}
        onChange={(previewImage) => onPreviewImageSave(previewImage, false)}
      />
    </>
  );
}