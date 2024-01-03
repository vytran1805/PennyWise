import { TransactionData, TransactionsResponse } from './types';
import { emptySplitApi } from './emptySplitApi';

const TRANSACTIONS_URL = 'api/transactions/';
export const transactionsApi = emptySplitApi.injectEndpoints({
  // reducerPath: 'transactions',
  // baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    createTransaction: builder.mutation<void, { data: TransactionData }>({
      query: ({ data }) => ({
        url: TRANSACTIONS_URL, // Assuming API endpoint for updating a specific transaction
        method: 'POST', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: data, // Send the updated data to the server
      }),
    }),
    getAllTransactions: builder.query<TransactionsResponse[], void>({
      query: () => TRANSACTIONS_URL,
    }),
    deleteTransaction: builder.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: TRANSACTIONS_URL, // Assuming API endpoint for deleting a specific transaction
        method: 'DELETE',
        body: { _id },
      }),
    }),
    updateTransaction: builder.mutation<void, { data: TransactionsResponse }>({
      query: ({ data }) => ({
        url: TRANSACTIONS_URL, // Assuming API endpoint for updating a specific transaction
        method: 'PATCH', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: { ...data }, // Send the updated data to the server
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetAllTransactionsQuery,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} = transactionsApi;
