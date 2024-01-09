import { ExpensesIncomeChart } from '@/components/dashboard/ExpensesChart';

import { Box } from '@mui/material';
import styled from 'styled-components';

// style FlexBetween component for reusable
const Container = styled(Box)({
  // display: 'flex',
  // justifyContent: 'space-between',
  // alignItems: 'center',
});
export const Dashboard = () => {
  return (
    <Container>
      <ExpensesIncomeChart />
    </Container>
  );
};
