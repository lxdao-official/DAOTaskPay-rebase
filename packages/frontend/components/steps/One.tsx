import { Box } from '@mui/material';
import { Input } from '@nextui-org/react';
import CardModule from '../CardModule';
import styled from 'styled-components';
const FormItem = styled.div``;
export default function StepOne() {
  return (
    <Box>
      <CardModule title="发起任务">
        <FormItem>
          <Input labelLeft="里程碑时间" type="date" />
          <Input labelLeft="报酬数量" type="Number" />
        </FormItem>
      </CardModule>
    </Box>
  );
}
