import {
  useDeleteIncomeMutation,
  useGetAllIncomesQuery,
  useUpdateIncomeMutation,
} from '@/redux/incomesApi';
import { TransactionResponse } from '@/redux/types';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { AddIncomeButton } from './AddIncomeButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { numberToCurrency } from '@/utils/currencyUtils';
import { dateFormat } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { useGetTotalAmount } from '@/hooks/useGetTotalAmount';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
// NOTE: The 'description' will be shown in the IncomeDetails component
export const IncomesTable = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState<TransactionResponse[]>([]);
  const { data: incomesData } = useGetAllIncomesQuery(); // Fetch income data using the query hook
  const [totalIncomes, setTotalIncomes] = useState<string>('');
  // Destructuring mutation hooks for deleting and updating incomes
  const [deleteIncome] = useDeleteIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();

  const getTotalIncomes = () => {
    const total = useGetTotalAmount(incomesData);
    setTotalIncomes(total);
  };
  // Prepare row records for the table
  useEffect(() => {
    if (incomesData) {
      const incomeRows = incomesData.map((data: TransactionResponse) => ({
        id: Math.floor(Math.random() * 1000) + 1, //'id' property is needed for table
        ...data,
      }));
      setIncomes(incomeRows);
      getTotalIncomes();
    }
    // Cleanup function
    return () => {
      setTotalIncomes(''); // Clear the state when component is unmounted
    };
  }, [incomesData]);

  const handleUpdate = async (
    updatedData: TransactionResponse
  ): Promise<TransactionResponse> => {
    try {
      await updateIncome({ data: updatedData });

      const updatedIncomes = incomes.map((income) =>
        income._id === updatedData._id ? updatedData : income
      );

      setIncomes(updatedIncomes);
      return updatedData; // Return the updated data
    } catch (error) {
      console.error('Failed to update income:', error);
    }
    throw new Error('Failed to update income'); // Throw an error if the update fails
  };

  const handleDelete = async (_id: string) => {
    try {
      await deleteIncome({ _id });
      const updatedIncomes = incomes.filter((income) => income._id !== _id);
      setIncomes(updatedIncomes);
    } catch (error) {
      console.error('Failed to delete income:', error);
    }
  };

  const handleRowClick = (params: GridRowParams) => {
    console.log('Clicked row data:', params.row);
    const clickedIncomeId = params.row._id;
    if (clickedIncomeId) {
      navigate(`/incomes/${clickedIncomeId}`);
      console.log('navigated to income details');
    }
    console.log('Clicked income ID:', clickedIncomeId);
    // Perform actions or state updates based on the clicked row data
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    {
      field: 'date',
      headerName: 'Date',
      type: 'Date',
      flex: 2,
      editable: true,
      valueFormatter: ({ value }) => dateFormat(value),
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
      type: 'number',
      flex: 1,
      editable: true,
      valueFormatter: ({ value }) => numberToCurrency(value), // Format amount as currency (CAD)
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const incomeId = params.row._id;
        return (
          <IconButton
            onClick={() => {
              incomeId && handleDelete(incomeId);
              console.log({ incomeId });
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
      <Typography variant='h2'>Total Income: {totalIncomes}</Typography>
      <DataGrid
        rows={incomes}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        slots={{ toolbar: () => <AddIncomeButton /> }}
        pageSizeOptions={[5, 10]}
        editMode='row'
        processRowUpdate={handleUpdate}
        onRowClick={handleRowClick}
      />
    </Container>
  );
};
