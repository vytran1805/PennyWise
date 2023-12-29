import {
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
  useUpdateTransactionMutation,
} from '@/redux/apiSlice';
import { TransactionsResponse } from '@/redux/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { Button } from '@mui/material';

export const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionsResponse[]>([]);
  const { data } = useGetAllTransactionsQuery();
  console.log(data);

  const [deleteTransaction] = useDeleteTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  /**
   * Prepare data for the transactions using useMemo()
   * @FirstParam call back function
   * @SecondParam a dependency array [data], whenever 'data' changes, the function will be recomputed
   */
  useMemo(() => {
    if (data) {
      const transformedData = data.map(
        (
          { name, date, amount, category, description, _id, type, __v },
          index
        ) => ({
          id: index + 1,
          name,
          type,
          date,
          amount,
          category,
          description,
          _id,
          __v,
        })
      );
      setTransactions(transformedData);
    }
  }, [data]);

  const handleUpdate = async (
    updatedData: TransactionsResponse
  ): Promise<TransactionsResponse> => {
    try {
      // const { _id } = updatedData;
      const result = await updateTransaction({ data: updatedData });
      console.log({ result });

      const updatedTransactions = transactions.map((transaction) =>
        transaction._id === updatedData._id ? updatedData : transaction
      );
      console.log({ updatedData });

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
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
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
    <DataGrid
      rows={transactions}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      editMode='row'
      processRowUpdate={handleUpdate}
    />
  );
};
