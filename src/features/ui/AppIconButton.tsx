import { LoadingButton } from "@mui/lab";
import { type SxProps, type Theme } from "@mui/material";

interface Props {
  isSmall?: boolean;
  onClick: () => void;
  "aria-label": string;
  children: JSX.Element;
  variant?: "outlined" | "contained";
  disabled?: boolean;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppIconButton(props: Props) {
  return (
    <LoadingButton
      loading={props.isLoading}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      variant={props.variant ?? "outlined"}
      disabled={props.disabled}
      sx={{
        borderRadius: 2,
        minWidth: "auto",
        width: props.isSmall ? 34 : { xs: 48, md: 58 },
        height: props.isSmall ? 34 : { xs: 48, md: 58 },
        ...props.sx,
      }}
    >
      {props.children}
    </LoadingButton>
  );
}
