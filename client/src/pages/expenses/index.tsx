import styled from 'styled-components';
import { Box } from '@mui/material';
import { testIds } from './testIds';
import { TimelinePicker } from '@/components/expenses/mainSection/TimelinePicker';
import { ExpensesTable } from '@/components/expenses/mainSection/ExpensesTable';
import { ExpenseDetails } from '@/components/expenses/rightSection/ExpenseDetails';
import { Route, Routes } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  /* width: 100%; */
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

export const Expenses = () => {
  return (
    <Container data-test-id={testIds.expenses.container}>
      <MainContainer data-test-id={testIds.expenses.mainContainer.container}>
        <TimelinePicker />
        <ExpensesTable />
      </MainContainer>
      <RightContainer data-test-id={testIds.expenses.rightContainer.container}>
        <Routes>
          <Route path='/:id' element={<ExpenseDetails />} />
        </Routes>
      </RightContainer>
    </Container>
  );
};
