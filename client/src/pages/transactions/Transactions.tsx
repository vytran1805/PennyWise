import styled from 'styled-components';
import { Box } from '@mui/material';
import { testIds } from '../testIds';
import { TimelinePicker } from '../../components/budgets/mainSection/TimelinePicker';
import { RightSection } from '../../components/budgets/rightSection/RightSection';
import { TransactionsTable } from '../../components/budgets/mainSection/TransactionsTable';

const Container = styled(Box)`
  display: flex;
  height: 100%;
`;

const MainContainer = styled(Box)`
  background: white;
  flex: 2;
  padding: 10px;
  gap: 10px;
`;

const RightContainer = styled(Box)`
  flex: 1;
  padding: 10px;
`;

export const Transactions = () => {
  return (
    <Container data-test-id={testIds.budgets.container}>
      <MainContainer data-test-id={testIds.budgets.mainContainer}>
        <TimelinePicker />
        <TransactionsTable />
      </MainContainer>
      <RightContainer data-test-id={testIds.budgets.rightContainer}>
        <RightSection />
      </RightContainer>
    </Container>
  );
};
