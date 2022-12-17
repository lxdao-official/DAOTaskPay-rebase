import { Step, StepContent, StepLabel, Stepper } from '@mui/material';
import CardModule from './CardModule';
import StepOne from './steps/One';

export default function Index() {
  return (
    <CardModule title="添加项目">
      <StepOne />
    </CardModule>
  );
}
