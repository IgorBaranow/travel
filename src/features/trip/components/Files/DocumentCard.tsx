import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";

interface Props {
  name: string;
  url?: string | null;
  onRemoveClick: () => void;
}

export default function DocumentCard({ name, url, onRemoveClick }: Props) {
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
      <IconButton
        onClick={onRemoveClick}
        sx={{ position: "absolute", top: 8, right: 8, width: "fit-content" }}
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
