import {
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
  useUpdateExpenseMutation,
} from '@/redux/expensesApi';
import { TransactionResponse } from '@/redux/types';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { IconButton, Typography, useTheme } from '@mui/material';
import { AddExpenseButton } from './AddExpenseButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { numberToCurrency } from '@/utils/currencyUtils';
import { dateFormat } from '@/utils/dateUtils';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
type Props = {
  onExpenseSelected: React.Dispatch<
    React.SetStateAction<TransactionResponse | undefined>
  >;
};
export const ExpensesTable = (props: Props) => {
  const { onExpenseSelected } = props;
  const { palette } = useTheme();
  const [expenses, setExpenses] = useState<TransactionResponse[]>([]);
  const { data: expensesData, refetch } = useGetAllExpensesQuery(); // Fetch expense data

  // Destructuring mutation hooks for deleting and updating expenses
  const [deleteExpense] = useDeleteExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  const getTotalExpenses = () => {
    // NOTE: use forEach
    // let totalExpenses = 0;
    // expenses?.forEach((expense) => {
    //   console.log(typeof expense.amount);

    //   totalExpenses += expense.amount;
    // });

    /* use reduce */
    const totalExpenses = expenses.reduce((acc, expense) => {
      return Number(acc) + Number(expense.amount);
    }, 0);
    return numberToCurrency(totalExpenses);
  };
  /**
   * Prepare row records for the table using useMemo()
   * @FirstParam call back function
   * @SecondParam a dependency array [data], whenever 'data' changes, the function will be recomputed
   */
  useEffect(() => {
    if (expensesData) {
      const expenseRows = expensesData.map((data: TransactionResponse) => ({
        id: Math.floor(Math.random() * 1000) + 1, //'id' property is needed for table
        ...data,
      }));
      setExpenses(expenseRows);
      // TODO: Read RTK docs about this, is there any other ways to update UI in realtime (when switching tabs)
      refetch(); //re-fetching the data from server
      // setAccountBalance(getTotalExpenses());
    }
  }, [expensesData]);

  const handleUpdate = async (
    updatedData: TransactionResponse
  ): Promise<TransactionResponse> => {
    try {
      await updateExpense({ data: updatedData });

      const updatedExpenses = expenses.map((expense) =>
        expense._id === updatedData._id ? updatedData : expense
      );

      setExpenses(updatedExpenses);
      return updatedData; // Return the updated data
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
    throw new Error('Failed to update expense'); // Throw an error if the update fails
  };

  const handleDelete = async (_id: string) => {
    try {
      await deleteExpense({ _id });
      const updatedExpenses = expenses.filter((expense) => expense._id !== _id);
      setExpenses(updatedExpenses);
      onExpenseSelected(undefined);
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  const handleRowClick = (params: GridRowParams) => {
    console.log('Clicked row data:', params.row);
    onExpenseSelected(params.row);
    const clickedExpenseId = params.row._id;
    console.log('Clicked expense ID:', clickedExpenseId);
    // Perform actions or state updates based on the clicked row data
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    {
      field: 'date',
      headerName: 'Date',
      flex: 2,
      editable: true,
      valueFormatter: ({ value }) => dateFormat(value),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      editable: true,
      valueFormatter: ({ value }) => numberToCurrency(value), // Format amount as currency (CAD)
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const expenseId = params.row._id;
        return (
          <IconButton
            onClick={() => {
              expenseId && handleDelete(expenseId);
              console.log({ expenseId });
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Container>
      <Typography variant='h2' color={palette.primary[700]}>
        Total expenses: {getTotalExpenses()}
      </Typography>
      <DataGrid
        rows={expenses}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        slots={{ toolbar: () => <AddExpenseButton /> }}
        pageSizeOptions={[5, 10]}
        editMode='row'
        processRowUpdate={handleUpdate}
        onRowClick={handleRowClick}
      />
    </Container>
  );
};
