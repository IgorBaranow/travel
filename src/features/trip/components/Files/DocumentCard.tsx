import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  name: string;
  url?: string | null;
  onRemoveClick: () => void;
  uploadProgress: number | undefined;
}

export default function DocumentCard({
  name,
  url,
  onRemoveClick,
  uploadProgress,
}: Props) {
  return (
    <Box
      sx={{
        position: "relative",

        border: 1,
        borderRadius: 4,
        borderColor: "grey.200",
        width: 200,
      }}
    >
      {uploadProgress && (
        <CircularProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            position: "absolute",
            top: "calc(50% - 2rem)",
            left: "calc(50% - 1.25rem)",
          }}
        />
      )}
      <IconButton
        onClick={onRemoveClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          width: "fit-content",
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Stack
        href={url ?? "#"}
        component={Link}
        target="_blank"
        rel="noopener noreferrer"
        gap={2}
        sx={{
          width: "100%",
          height: "100%",
          p: 2,
          pt: 6,
          textDecoration: "none",
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <Stack gap={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              height: 133,
              bgcolor: "grey.100",
              borderRadius: 4,
            }}
          >
            <InsertDriveFileIcon sx={{ color: "text.secondary" }} />
          </Stack>
          <Typography color="text.primary">{name}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
