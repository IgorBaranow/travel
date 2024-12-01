import { LoadingButton } from "@mui/lab";
import { Button, type SxProps, type Theme, Typography } from "@mui/material";

interface Props {
  type: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  children: React.ReactNode;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type,
  variant = "contained",
  children,
  fullWidth,
  sx,
}: Props) {
  return (
    <LoadingButton
      type={type}
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
