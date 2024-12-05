import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MobileStepper } from "@mui/material";

import AppButton from "@features/ui/AppButton";

import { WIZARD_STEPS } from "../../data";

export default function Pagination() {
  const activeStep = 0;

  return (
    <MobileStepper
      variant="text"
      steps={WIZARD_STEPS.length}
      position="static"
      activeStep={activeStep}
      nextButton={
        <AppButton type="submit" endIcon={<ArrowForwardIcon />}>
          Next
        </AppButton>
      }
      backButton={
        <AppButton
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ visibility: activeStep === 0 ? "hidden" : "visible" }}
        >
          Back
        </AppButton>
      }
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        p: { xs: 2, md: 3 },
        borderRadius: 4,
      }}
    />
  );
}
