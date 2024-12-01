import { useMediaQuery } from "@mui/material";

import { theme } from "@config/styles";

export function useBreakpoints() {
  const sm = useMediaQuery(theme.breakpoints.up("md"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("md"));

  return { sm, md, lg };
}
