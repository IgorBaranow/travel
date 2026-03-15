import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Link, Stack } from '@mui/material';

import AppIconButton from '@features/ui/AppIconButton';
import { useBreakpoints } from '@hooks/useBreakpoints';

interface Props {
  src?: string | null;
  onRemoveClick: () => void;
  onClick?: () => void;
  uploadProgress: number | undefined;
  isRemoving: boolean;
  enableBorders?: boolean;
  borderColor?: string;
}

export default function PhotoCard({
  src,
  onRemoveClick,
  uploadProgress,
  isRemoving,
  onClick,
  enableBorders,
  borderColor,
}: Props) {
  const { md } = useBreakpoints();

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        borderRadius: 4,
        border: enableBorders ? 4 : 0,
        borderColor: borderColor,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {uploadProgress != undefined && (
        <CircularProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            position: 'absolute',
            top: 'calc(50% - 1.25rem)',
            left: 'calc(50% - 1.25rem)',
          }}
        />
      )}
      <AppIconButton
        aria-label="remove photo"
        onClick={(event) => {
          event?.stopPropagation();
          onRemoveClick();
        }}
        variant="contained"
        isSmall={!md}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          opacity: uploadProgress ? 0.2 : 1,
        }}
        disabled={isRemoving}
        isLoading={isRemoving}
      >
        <CloseIcon fontSize={md ? 'medium' : 'small'} />
      </AppIconButton>
      <Stack
        href={isRemoving || onClick ? '' : src ?? '#'}
        component={Link}
        target={isRemoving || onClick ? '_self' : '_blank'}
        rel="noopener noreferrer"
        gap={2}
        sx={{
          width: '100%',
          height: '100%',
          textDecoration: 'none',
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <img
          src={src ?? ''}
          alt="custom photo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            aspectRatio: '1/1',
          }}
        />
      </Stack>
    </Box>
  );
}