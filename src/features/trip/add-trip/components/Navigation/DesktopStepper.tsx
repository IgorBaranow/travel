import { Step, StepLabel, Stepper } from "@mui/material";

import { useBreakpoints } from "@store/hooks/useBreakpoints";

import { WizardSteps } from "../../type";

interface Props {
  activeStep: number;
  steps: WizardSteps[];
}

export default function DesktopStepper({ activeStep, steps }: Props) {
  const { xl } = useBreakpoints();

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel={!xl}
      sx={{ display: { xs: "none", lg: "flex" }, mb: 8, ml: -1 }}
    >
      {steps.map(({ title }) => (
        <Step key={title}>
          <StepLabel
            StepIconProps={{
              sx: {
                height: { xs: 35, xl: 49 },
                width: { xs: 35, xl: 49 },
              },
            }}
          >
            {title}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
