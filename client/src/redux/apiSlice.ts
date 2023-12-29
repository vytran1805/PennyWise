import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TransactionsResponse } from './types';
export const transactionsApi = createApi({
  reducerPath: 'transactions',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    createTransaction: builder.mutation<void, { data: TransactionsResponse }>({
      query: ({ data }) => ({
        url: `api/transactions/`, // Assuming API endpoint for updating a specific transaction
        method: 'POST', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: { ...data }, // Send the updated data to the server, CLEANER WAY FOR THIS: body: { ...data }
      }),
    }),
    getAllTransactions: builder.query<TransactionsResponse[], void>({
      query: () => '/api/transactions',
    }),
    deleteTransaction: builder.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: `/api/transactions/`, // Assuming API endpoint for deleting a specific transaction
        method: 'DELETE',
        body: { _id },
      }),
    }),
    updateTransaction: builder.mutation<void, { data: TransactionsResponse }>({
      query: ({ data }) => ({
        url: `api/transactions/`, // Assuming API endpoint for updating a specific transaction
        method: 'PATCH', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: { ...data }, // Send the updated data to the server, CLEANER WAY FOR THIS: body: { ...data }
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
