import { Box, Typography } from "@mui/material";

import { useAppSelector } from "@store/index";

import { WIZARD_STEPS } from "../data";
import { selectCurrentStep } from "../store/tripWizardSlice";
import DesktopStepper from "./Navigation/DesktopStepper";

export default function AddTripWizard() {
  const currentStep = useAppSelector(selectCurrentStep);
  const stepData = WIZARD_STEPS[currentStep];
  const StepComponent = stepData.Component;
  return (
    <Box>
      <DesktopStepper steps={WIZARD_STEPS} currentStep={currentStep} />
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
          Step {currentStep + 1}
        </Typography>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 1 } }}>
          {stepData.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ display: { xs: "none", md: "block" }, mb: 3, maxWidth: "72%" }}
        >
          {stepData.description}
        </Typography>
        <Box
          sx={{
            minHeight: { xs: "56vh", md: "auto" },
            maxHeight: { xs: "56vh", md: "40vh" },
            overflowY: "scroll",
          }}
        >
          <StepComponent />
        </Box>
      </Box>
    </Box>
  );
}
