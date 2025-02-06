import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { IconButton, Link, Stack, Typography } from "@mui/material";

interface Props {
  name: string;
  url?: string | null;
}

export default function DocumentCard({ name, url }: Props) {
  return (
    <Stack
      href={url ?? "#"}
      component={Link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        gap: 1,
        p: 2,
        border: 1,
        borderRadius: 4,
        borderColor: "grey.200",
      }}
    >
      <IconButton sx={{ justifySelf: "flex-end" }}>
        <CloseIcon />
      </IconButton>
      <Stack gap={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", height: "133", bgcolor: "grey.100" }}
        >
          <InsertDriveFileIcon />
        </Stack>
        <Typography>{name}</Typography>
      </Stack>
    </Stack>
  );
}
