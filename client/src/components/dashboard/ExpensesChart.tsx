import { useEffect, useState } from 'react';
import { useGetAllExpensesQuery } from '@/redux/expensesApi'; // Update the path with your actual imports
import { dateFormat } from '@/utils/dateUtils';
import { useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGetAllIncomesQuery } from '@/redux/incomesApi';

type ColorProps = {
  color: string;
};

const ChartStyled = styled.div<ColorProps>`
  background-color: ${(props) => props.color};
  border: 2px solid;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  /* height: 100%; */
`;

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const ExpensesIncomeChart = () => {
  // Get theme from Material-UI
  const { palette } = useTheme();

  // Fetch expenses and incomes data
  const { data: expenses, refetch: refetchExpensesData } =
    useGetAllExpensesQuery();
  const { data: incomes, refetch: refetchIncomesData } =
    useGetAllIncomesQuery();

  // State to hold chart data
  const [chartData, setChartData] = useState<any>(null);

  // Calculate chart data when expenses or incomes change
  useEffect(() => {
    if (expenses && incomes) {
      const allDatesSet = new Set([
        ...(expenses?.map((expense: any) => dateFormat(expense.date)) || []),
        ...(incomes?.map((income: any) => dateFormat(income.date)) || []),
      ]);
      const allDates = Array.from(allDatesSet).sort();

      const expensesData = allDates.map((date) => {
        const expense = expenses.find((e: any) => dateFormat(e.date) === date);
        return expense ? expense.amount : 0;
      });

      const incomesData = allDates.map((date) => {
        const income = incomes.find((i: any) => dateFormat(i.date) === date);
        return income ? income.amount : 0;
      });

      const updatedData = {
        labels: allDates,
        datasets: [
          {
            label: 'Expense',
            data: expensesData,
            backgroundColor: 'red',
            tension: 0.2,
          },
          {
            label: 'Income',
            data: incomesData,
            backgroundColor: 'green',
            tension: 0.2,
          },
        ],
      };

      setChartData(updatedData);
      refetchExpensesData();
      refetchIncomesData();
    }
  }, [expenses, incomes]);

  return (
    <ChartStyled color={palette.primary[200]}>
      {chartData && <Line data={chartData} />}
    </ChartStyled>
  );
};
