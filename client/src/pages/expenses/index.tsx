import styled from 'styled-components';
import { Box } from '@mui/material';
import { testIds } from './testIds';
import { ExpenseResponse } from '@/redux/types';
import { useState } from 'react';
import { TimelinePicker } from '@/components/expenses/mainSection/TimelinePicker';
import { ExpensesTable } from '@/components/expenses/mainSection/ExpensesTable';
import { RightSection } from '@/components/expenses/rightSection/RightSection';

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
  const [selectedExpense, setSelectedExpense] = useState<ExpenseResponse>();
  return (
    <Container data-test-id={testIds.expenses.container}>
      <MainContainer data-test-id={testIds.expenses.mainContainer.container}>
        <TimelinePicker />
        <ExpensesTable onExpenseSelected={setSelectedExpense} />
      </MainContainer>
      <RightContainer data-test-id={testIds.expenses.rightContainer.container}>
        <RightSection expenseDetail={selectedExpense} />
      </RightContainer>
    </Container>
  );
};
