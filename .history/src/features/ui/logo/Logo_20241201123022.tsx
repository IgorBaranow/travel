import { Box, Typography } from "@mui/material";

import { APP_NAME } from "@config/constants";

interface Props {
  isMinimized?: boolean;
}

function LogoIcon() {
  return (
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6882 17.9784L13.2333 1.5H19.5314L31.9549 17.9784M21.6882 17.9784H31.9549M21.6882 17.9784H12.8419M21.6882 17.9784H13.2333M31.9549 17.9784C41.8937 17.9784 45.1261 21.5444 45.5 23.3274M45.5 23.3274C31.7536 23.5288 4.01922 23.8106 3.05294 23.3274M45.5 23.3274C45.5 25 41.8937 29.0906 31.9549 29.0216M13.2333 17.9784H12.8419M13.2333 17.9784C13.1115 17.9784 12.9806 17.9803 12.8419 17.9784M1.5 17.9784V8.31569H5.64118C6.07255 9.14967 7.33216 11.6286 8.91961 14.8725C10.3203 17.7348 11.8016 17.9641 12.8419 17.9784M1.5 17.9784C1.61503 19.5601 2.08667 22.8443 3.05294 23.3274M1.5 17.9784H12.8419M3.05294 23.3274C5.39961 27.6067 9.72484 28.9065 11.5941 29.0216H21.6882M31.9549 29.0216C22.0161 28.9525 20.9693 28.9928 21.6882 29.0216M31.9549 29.0216L19.5314 45.5H13.2333L21.6882 29.0216"
        stroke="#729E65"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Logo({ isMinimized }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        gap: 2.5,
      }}
    >
      <LogoIcon />
      {!isMinimized && <Typography variant="h4">{APP_NAME}</Typography>}
    </Box>
  );
}
