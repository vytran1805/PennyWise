import {
  useDeleteIncomeMutation,
  useGetAllIncomesQuery,
  useUpdateIncomeMutation,
} from '@/redux/incomesApi';
import { IncomeResponse } from '@/redux/types';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { IconButton, Typography, useTheme } from '@mui/material';
import { AddIncomeButton } from './AddIncomeButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { numberToCurrency } from '@/utils/currencyUtils';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
type Props = {
  onIncomeSelected: React.Dispatch<
    React.SetStateAction<IncomeResponse | undefined>
  >;
};
export const IncomesTable = (props: Props) => {
  const { onIncomeSelected } = props;
  const { palette } = useTheme();
  const [incomes, setIncomes] = useState<IncomeResponse[]>([]);
  const { data: incomesData } = useGetAllIncomesQuery(); // Fetch income data

  // Destructuring mutation hooks for deleting and updating incomes
  const [deleteIncome] = useDeleteIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();

  const getAccountBalance = () => {
    // NOTE: use forEach
    // let balance = 0;
    // incomes?.forEach((income) => {
    //   console.log(typeof income.amount);

    //   balance += income.amount;
    // });

    /* use reduce */
    const balance = incomes.reduce((acc, income) => {
      return Number(acc) + Number(income.amount);
    }, 0);
    return numberToCurrency(balance);
  };
  /**
   * Prepare row records for the table using useMemo()
   * @FirstParam call back function
   * @SecondParam a dependency array [data], whenever 'data' changes, the function will be recomputed
   */
  useMemo(() => {
    if (incomesData) {
      const incomeRows = incomesData.map((data: IncomeResponse) => ({
        id: Math.floor(Math.random() * 1000) + 1, //'id' property is needed for table
        ...data,
      }));
      setIncomes(incomeRows);
      // setAccountBalance(getAccountBalance());
    }
  }, [incomesData]);

  const handleUpdate = async (
    updatedData: IncomeResponse
  ): Promise<IncomeResponse> => {
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
      onIncomeSelected(undefined);
    } catch (error) {
      console.error('Failed to delete income:', error);
    }
  };

  const handleRowClick = (params: GridRowParams) => {
    console.log('Clicked row data:', params.row);
    onIncomeSelected(params.row);
    const clickedIncomeId = params.row._id;
    console.log('Clicked income ID:', clickedIncomeId);
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
      <Typography variant='h2' color={palette.primary[700]}>
        Account balance: {getAccountBalance()}
      </Typography>
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