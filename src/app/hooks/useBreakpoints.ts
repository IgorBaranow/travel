import { useMediaQuery } from "@mui/material";

import { theme } from "@config/styles";

export function useBreakpoints() {
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));

  return { sm, md, lg, xl };
}
