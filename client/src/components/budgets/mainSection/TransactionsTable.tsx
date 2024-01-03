import {
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
  useUpdateTransactionMutation,
} from '@/redux/transactionsApi';
import { TransactionsResponse } from '@/redux/types';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { AddTransactionButton } from './AddTransactionButton';
type Props = {
  onTransactionSelected: React.Dispatch<
    React.SetStateAction<TransactionsResponse | undefined>
  >;
};
export const TransactionsTable = (props: Props) => {
  const { onTransactionSelected } = props;
  const [transactions, setTransactions] = useState<TransactionsResponse[]>([]);
  const { data: transactionData } = useGetAllTransactionsQuery(); // Fetch transaction data
  console.log(transactionData);

  // Destructuring mutation hooks for deleting and updating transactions
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

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
      console.log({ transactionRows });
    }
  }, [transactionData]);

  const handleUpdate = async (
    updatedData: TransactionsResponse
  ): Promise<TransactionsResponse> => {
    try {
      const result = await updateTransaction({ data: updatedData });
      console.log({ result });

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
      console.log('delete ', _id);
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
    { field: 'name', headerName: 'Name', minWidth: 70, editable: true },
    { field: 'date', headerName: 'Date', minWidth: 200, editable: true },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 100,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      minWidth: 150,
      editable: true,
    },
    { field: 'amount', headerName: 'Amount', minWidth: 100, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        const transactionId = params.row._id;
        return (
          <Button
            onClick={() => {
              transactionId && handleDelete(transactionId);
              console.log({ transactionId });
            }}
            variant='contained'
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box>
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
    </Box>
  );
};
