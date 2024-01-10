import { useEffect, useState } from 'react';
import { useGetAllExpensesQuery } from '@/redux/expensesApi'; // Update the path with your actual imports
import { dateFormat, sortDates } from '@/utils/dateUtils';
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

export const TransactionsChart = () => {
  // Get theme from Material-UI
  const { palette } = useTheme();

  // Fetch expenses and incomes data
  const { data: expenses } = useGetAllExpensesQuery();
  const { data: incomes } = useGetAllIncomesQuery();

  // State to hold chart data
  const [chartData, setChartData] = useState<any>(null);

  // Calculate chart data when expenses or incomes change
  useEffect(() => {
    if (expenses && incomes) {
      const allDatesSet = new Set([
        ...(expenses?.map((expense: any) => expense.date) || []),
        ...(incomes?.map((income: any) => income.date) || []),
      ]);

      const allDates = Array.from(allDatesSet).sort(sortDates);
      console.log({ allDates });

      const xAxisLabels = allDates.map((date) => dateFormat(date));

      const expensesData = allDates.map((date) => {
        const expense = expenses.find((e: any) => e.date === date);
        return expense ? expense.amount : 0;
      });

      const incomesData = allDates.map((date) => {
        const income = incomes.find((i: any) => i.date === date);
        return income ? income.amount : 0;
      });

      const updatedData = {
        labels: xAxisLabels,
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
    }
  }, [expenses, incomes]);

  return (
    <ChartStyled color={palette.primary[200]}>
      {chartData && <Line data={chartData} />}
    </ChartStyled>
  );
};
