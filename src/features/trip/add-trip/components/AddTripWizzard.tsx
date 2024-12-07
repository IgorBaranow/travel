import { Box, Typography } from "@mui/material";

import { WIZARD_STEPS } from "../data";
import DesktopStepper from "./Navigation/DesktopStepper";

export default function AddTripWizzard() {
  const activeStep = 0;
  const StepComponent = WIZARD_STEPS[activeStep].Component;
  return (
    <Box>
      <DesktopStepper steps={WIZARD_STEPS} activeStep={activeStep} />
      <Box
        sx={{
          bgcolor: "white",
          p: { xs: 2, md: 3 },
          pb: { xs: 10, md: 13 },
          borderRadius: 4,
          maxWidth: 926,
          mx: "auto",
          position: "relative",
        }}
      >
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          Step {activeStep + 1}
        </Typography>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 1 } }}>
          {WIZARD_STEPS[activeStep].title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ display: { xs: "none", md: "block" }, mb: 3 }}
        >
          {WIZARD_STEPS[activeStep].description}
        </Typography>
        <Box
          sx={{
            minHeight: { xs: "56vh", md: "auto" },
            maxHeight: { xs: "56vh", md: "40vh" },
          }}
        >
          <StepComponent />
        </Box>
      </Box>
    </Box>
  );
}
