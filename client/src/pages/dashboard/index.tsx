import { TransactionsChart } from '@/components/dashboard/TransactionsChart';
import { Balance } from '@/components/dashboard/Balance';

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
      <Balance />
      <TransactionsChart />
    </Container>
  );
};
