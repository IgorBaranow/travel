import { LoadingButton } from "@mui/lab";
import { type SxProps, type Theme, Typography } from "@mui/material";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
  LinkComponent?: React.ElementType;
  disabled?: boolean;
  href?: string;
  isSmall?: boolean;
  color?:
    | 'error'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning';
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type = "button",
  variant = "contained",
  children,
  loading,
  fullWidth,
  LinkComponent,
  href,
  endIcon,
  startIcon,
  sx,
  disabled,
  isSmall,
  color,
  onClick,
}: Props) {
  return (
    <LoadingButton
      type={type}
      loading={loading}
      variant={variant}
      fullWidth={fullWidth}
      LinkComponent={LinkComponent}
      href={href}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
      color={color}
      sx={{
        borderRadius: 2,
        height: {
          xs: variant === 'text' || isSmall ? 42 : 48,
          md: variant === 'text' || isSmall ? 48 : 56,
        },
        textTransform: "none",
        width: fullWidth ? "100%" : "fit-content",
        ...sx,
      }}
    >
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </LoadingButton>
  );
}
