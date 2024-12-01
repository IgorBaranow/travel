import { type LinkProps, createTheme } from "@mui/material";

import { FontFamilies } from "./FontFamilies";
import { FontWeights } from "./FontWeights";
import LinkBehavior from "./LinkBehavior";

const theme = createTheme({
  palette: {
    primary: {
      main: "#729E65",
    },
    text: {
      primary: "#223644",
      secondary: "#64727C",
    },
    grey: {
      [100]: "#F9F9F9",
    },
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        style: {
          fontFamily: FontFamilies.poppins,
          fontWeight: FontWeights.regular,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
    },
    // override default styles of MIU
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          lineHeight: "1.313rem",
          fontFamily: FontFamilies.roboto,
        },
      },
    },
    // use React link with MIU link to prevent re-rendering
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        style: {
          fontFamily: FontFamilies.poppins,
          fontWeight: FontWeights.regular,
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
    },
    // override default styles of MIU
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          lineHeight: "1.313rem",
          fontFamily: FontFamilies.roboto,
        },
      },
    },
    // use React link with MIU link to prevent re-rendering
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

theme.typography.h1 = {
  fontSize: "2rem",
  lineHeight: "3rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    lineHeight: "2.25rem",
  },
};

theme.typography.h2 = {
  fontSize: "1.875rem",
  lineHeight: "2.813rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.375rem",
    lineHeight: "2.063rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.5rem",
  lineHeight: "2.25rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
  },
};

theme.typography.h5 = {
  fontSize: "1.375rem",
  lineHeight: "2.063rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
};
theme.typography.h6 = {
  fontSize: "1.25rem",
  lineHeight: "1.875rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
  },
};
theme.typography.body1 = {
  fontSize: "1.125rem",
  lineHeight: "1.688rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
};
theme.typography.body2 = {
  fontSize: "1.125rem",
  lineHeight: "1.688rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
};
theme.typography.subtitle1 = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
};
theme.typography.subtitle2 = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.medium,
};
theme.typography.caption = {
  fontSize: "0.875rem",
  lineHeight: "1.313rem",
  fontFamily: FontFamilies.poppins,
  fontWeight: FontWeights.regular,
};

export default theme;
