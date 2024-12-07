export interface WizardSteps {
  title: string;
  description: string;
  Component: () => JSX.Element;
}
