import { TransactionsChart } from '@/components/dashboard/TransactionsChart';

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
      <TransactionsChart />
    </Container>
  );
};
