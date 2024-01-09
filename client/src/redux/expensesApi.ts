import { TransactionData, TransactionResponse } from './types';
import { emptySplitApi } from './emptyApi';

const EXPENSES_URL = 'api/expenses/';
export const expensesApi = emptySplitApi.injectEndpoints({
  // reducerPath: 'expenses',
  // baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    createExpense: build.mutation<void, { data: TransactionData }>({
      query: ({ data }) => ({
        url: EXPENSES_URL, // Assuming API endpoint for updating a specific expense
        method: 'POST', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: data, // Send the updated data to the server
      }),
      invalidatesTags: ['Expenses'],
    }),
    getAllExpenses: build.query<TransactionResponse[], void>({
      query: () => EXPENSES_URL,
      // Generates cache tags for each expense item fetched
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: 'Expenses', _id })) : [],
      // For each fetched expense, creates a cache tag of type 'Expenses' using the _id
      // These tags are used for caching and data invalidation purposes
    }),
    deleteExpense: build.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: EXPENSES_URL, // Assuming API endpoint for deleting a specific expense
        method: 'DELETE',
        body: { _id },
      }),
      invalidatesTags: ['Expenses'],
    }),
    updateExpense: build.mutation<void, { data: TransactionResponse }>({
      query: ({ data }) => ({
        url: EXPENSES_URL, // Assuming API endpoint for updating a specific expense
        method: 'PATCH', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: { ...data }, // Send the updated data to the server
      }),
      invalidatesTags: ['Expenses'],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} = expensesApi;
