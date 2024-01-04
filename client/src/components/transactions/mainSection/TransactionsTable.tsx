import {
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
  useUpdateTransactionMutation,
} from '@/redux/transactionsApi';
import { TransactionType, TransactionsResponse } from '@/redux/types';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { IconButton, Typography, useTheme } from '@mui/material';
import { AddTransactionButton } from './AddTransactionButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { numberToCurrency } from '@/utils/currencyUtils';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
type Props = {
  onTransactionSelected: React.Dispatch<
    React.SetStateAction<TransactionsResponse | undefined>
  >;
};
export const TransactionsTable = (props: Props) => {
  const { onTransactionSelected } = props;
  const { palette } = useTheme();
  const [transactions, setTransactions] = useState<TransactionsResponse[]>([]);
  const { data: transactionData } = useGetAllTransactionsQuery(); // Fetch transaction data

  // Destructuring mutation hooks for deleting and updating transactions
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  const getAccountBalance = () => {
    // NOTE: use forEach
    // let balance = 0;
    // transactions?.forEach((transaction) => {
    //   balance += transaction.amount;
    // });

    /* use reduce */
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === TransactionType.Expenses
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
    return numberToCurrency(balance);
  };
  /**
   * Prepare row records for the table using useMemo()
   * @FirstParam call back function
   * @SecondParam a dependency array [data], whenever 'data' changes, the function will be recomputed
   */
  useMemo(() => {
    if (transactionData) {
      const transactionRows = transactionData.map(
        (data: TransactionsResponse) => ({
          id: Math.floor(Math.random() * 1000) + 1, //'id' property is needed for table
          ...data,
        })
      );
      setTransactions(transactionRows);
      // setAccountBalance(getAccountBalance());
    }
  }, [transactionData]);

  const handleUpdate = async (
    updatedData: TransactionsResponse
  ): Promise<TransactionsResponse> => {
    try {
      const result = await updateTransaction({ data: updatedData });

      const updatedTransactions = transactions.map((transaction) =>
        transaction._id === updatedData._id ? updatedData : transaction
      );

      setTransactions(updatedTransactions);
      return updatedData; // Return the updated data
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
    throw new Error('Failed to update transaction'); // Throw an error if the update fails
  };

  const handleDelete = async (_id: string) => {
    try {
      await deleteTransaction({ _id });
      const updatedTransactions = transactions.filter(
        (transaction) => transaction._id !== _id
      );
      setTransactions(updatedTransactions);
      onTransactionSelected(undefined);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  const handleRowClick = (params: GridRowParams) => {
    console.log('Clicked row data:', params.row);
    onTransactionSelected(params.row);
    const clickedTransactionId = params.row._id;
    console.log('Clicked transaction ID:', clickedTransactionId);
    // Perform actions or state updates based on the clicked row data
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    { field: 'date', headerName: 'Date', flex: 2, editable: true },
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
    { field: 'type', headerName: 'Type', flex: 1, editable: true },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const transactionId = params.row._id;
        return (
          <IconButton
            onClick={() => {
              transactionId && handleDelete(transactionId);
              console.log({ transactionId });
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
        Account balance: {getAccountBalance()}
      </Typography>
      <DataGrid
        rows={transactions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        slots={{ toolbar: () => <AddTransactionButton /> }}
        pageSizeOptions={[5, 10]}
        editMode='row'
        processRowUpdate={handleUpdate}
        onRowClick={handleRowClick}
      />
    </Container>
  );
};
