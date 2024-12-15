import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import AppButton from "./AppButton";

const DESKTOP_PADDING_X = 4;
const MOBILE_PADDING_X = 2;
const DESKTOP_PADDING_Y = 5;
const MOBILE_PADDING_Y = 3;
interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  primaryButtonText: string;
  onPrimaryButtonClick: () => void;
  children: React.ReactNode;
}
export default function AppDialog({
  isOpen,
  onClose,
  primaryButtonText,
  onPrimaryButtonClick,
  children,
  title,
}: Props) {
  const { md } = useBreakpoints();
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      PaperProps={{
        sx: { borderRadius: 2, width: { md: 864 }, maxWidth: "inherit" },
      }}
      fullScreen={!md}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 24,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon fontSize="large" sx={{ color: "text.primary" }} />
      </IconButton>
      <Typography
        textAlign="center"
        variant="h4"
        sx={{
          pt: 8.75,
          px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X },
          pb: 3,
        }}
      >
        {title}
      </Typography>
      <DialogContent
        sx={{ px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X }, py: 0 }}
      >
        {children}
      </DialogContent>
      <DialogActions
        sx={{
          px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X },
          pb: { xs: MOBILE_PADDING_Y, md: DESKTOP_PADDING_Y },
          pt: 3,
        }}
      >
        <AppButton fullWidth onClick={onPrimaryButtonClick}>
          {primaryButtonText}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
