import { TransactionData, TransactionResponse } from './types';
import { emptySplitApi } from './emptyApi';

const INCOME_URL = 'api/incomes/';
export const incomesApi = emptySplitApi.injectEndpoints({
  // reducerPath: 'incomes',
  // baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (build) => ({
    createIncome: build.mutation<void, { data: TransactionData }>({
      query: ({ data }) => ({
        url: INCOME_URL, // Assuming API endpoint for updating a specific income
        method: 'POST', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: data, // Send the updated data to the server
      }),
    }),
    getAllIncomes: build.query<TransactionResponse[], void>({
      query: () => INCOME_URL,
    }),
    deleteIncome: build.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: INCOME_URL, // Assuming API endpoint for deleting a specific income
        method: 'DELETE',
        body: { _id },
      }),
    }),
    updateIncome: build.mutation<void, { data: TransactionResponse }>({
      query: ({ data }) => ({
        url: INCOME_URL, // Assuming API endpoint for updating a specific income
        method: 'PATCH', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: { ...data }, // Send the updated data to the server
      }),
    }),
  }),
});

export const {
  useCreateIncomeMutation,
  useGetAllIncomesQuery,
  useDeleteIncomeMutation,
  useUpdateIncomeMutation,
} = incomesApi;
