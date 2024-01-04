import { ExpenseData, ExpenseResponse } from './types';
import { emptySplitApi } from './emptyApi';

const EXPENSES_URL = 'api/expenses/';
export const expensesApi = emptySplitApi.injectEndpoints({
  // reducerPath: 'expenses',
  // baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    createExpense: builder.mutation<void, { data: ExpenseData }>({
      query: ({ data }) => ({
        url: EXPENSES_URL, // Assuming API endpoint for updating a specific expense
        method: 'POST', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: data, // Send the updated data to the server
      }),
    }),
    getAllExpenses: builder.query<ExpenseResponse[], void>({
      query: () => EXPENSES_URL,
    }),
    deleteExpense: builder.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: EXPENSES_URL, // Assuming API endpoint for deleting a specific expense
        method: 'DELETE',
        body: { _id },
      }),
    }),
    updateExpense: builder.mutation<void, { data: ExpenseResponse }>({
      query: ({ data }) => ({
        url: EXPENSES_URL, // Assuming API endpoint for updating a specific expense
        method: 'PATCH', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: { ...data }, // Send the updated data to the server
      }),
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} = expensesApi;
