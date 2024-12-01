import { LoadingButton } from "@mui/lab";
import { type SxProps, type Theme, Typography } from "@mui/material";

interface Props {
  type: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type,
  variant = "contained",
  children,
  loading,
  fullWidth,
  sx,
}: Props) {
  return (
    <LoadingButton
      type={type}
      loading
      variant={variant}
      fullWidth={fullWidth}
      sx={{
        borderRadius: 2,
        height: { xs: 48, md: 56 },
        textTransform: "none",
        typography: "body2",
        ...sx,
      }}
    >
      <Typography component="span"></Typography>
      {children}
    </LoadingButton>
  );
}
