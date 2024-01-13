import { useEffect, useState } from 'react';
import { useGetAllExpensesQuery } from '@/redux/expensesApi'; // Update the path with your actual imports
import { dateFormat, sortDates } from '@/utils/dateUtils';
import { useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
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
  BarElement,
  Title,
  Tooltip,
  Legend
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
      // Combine unique dates from both expenses and incomes
      const allDatesSet = new Set([
        ...(expenses?.map((expense: any) => expense.date) || []),
        ...(incomes?.map((income: any) => income.date) || []),
      ]);

      // Convert the set of dates to an array and sort them
      const allDates = Array.from(allDatesSet).sort(sortDates);
      console.log({ allDates });

      // Map dates to formatted labels for the X-axis
      const xAxisLabels = allDates.map((date) => dateFormat(date));

      // Map dates to total expenses for each date
      const expensesData = allDates.map((date) => {
        // Filter expenses for the current date
        const expensesOnDate = expenses.filter((e: any) => e.date === date);

        // Calculate total expense for the current date
        const totalExpense = expensesOnDate.reduce(
          (sum: number, expense: any) => sum + expense.amount,
          0
        );
        return totalExpense;
      });

      // Map dates to total incomes for each date
      const incomesData = allDates.map((date) => {
        // Filter incomes for the current date
        const incomesOnDate = incomes.filter((e: any) => e.date === date);

        // Calculate total income for the current date
        const totalIncome = incomesOnDate.reduce(
          (sum: number, income: any) => sum + income.amount,
          0
        );
        return totalIncome;
      });

      const updatedData = {
        labels: xAxisLabels,
        datasets: [
          {
            label: 'Expense',
            data: expensesData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Income',
            data: incomesData,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      setChartData(updatedData);
    }
  }, [expenses, incomes]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'TRANSACTIONS',
      },
    },
  };
  return (
    <ChartStyled color={palette.grey[100]}>
      {chartData && <Bar options={options} data={chartData} />}
    </ChartStyled>
  );
};
