import { useGetTotalAmount } from '@/hooks/useGetTotalAmount';
import { useGetAllExpensesQuery } from '@/redux/expensesApi';
import { useGetAllIncomesQuery } from '@/redux/incomesApi';
import { numberToCurrency } from '@/utils/currencyUtils';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

const Container = styled(Box)({});
export const Balance = () => {
  // Fetch expenses and incomes data
  const { data: expenses } = useGetAllExpensesQuery();
  const { data: incomes } = useGetAllIncomesQuery();
  const getBalance = () => {
    if (expenses && incomes) {
      const totalExpense = useGetTotalAmount(expenses);
      const totalIncome = useGetTotalAmount(incomes);
      return numberToCurrency(totalIncome - totalExpense);
    }
  };

  return (
    <Container>
      <Typography variant='h3'>Balance: {getBalance()}</Typography>
    </Container>
  );
};
