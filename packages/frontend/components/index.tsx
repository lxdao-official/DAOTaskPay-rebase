import { Step, StepContent, StepLabel, Stepper } from '@mui/material';

export default function Index() {
  return (
    <div>
      <Stepper activeStep={1} alternativeLabel>
        <Step key={'1'}>
          <StepLabel>第一步</StepLabel>
          <StepContent>发起者签名</StepContent>
        </Step>
      </Stepper>
    </div>
  );
}
