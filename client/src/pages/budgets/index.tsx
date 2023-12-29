import styled from 'styled-components';
import { Box } from '@mui/material';
import { testIds } from '../testIds';
import { TimelinePicker } from './mainSection/TimelinePicker';
import { RightSection } from './RightSection';
import { TransactionsTable } from './mainSection/TransactionsTable';

const Container = styled(Box)`
  display: flex;
  height: 100%;
`;

const MainContainer = styled(Box)`
  background: white;
  flex: 2;
  padding: 10px;
`;

const RightContainer = styled(Box)`
  flex: 1;
  padding: 10px;
`;

export const Budgets = () => {
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
