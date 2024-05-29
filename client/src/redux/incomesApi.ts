import { TransactionData, TransactionResponse } from './types';
import { emptySplitApi } from './emptyApi';

const INCOME_URL = 'api/income';
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
      invalidatesTags: ['Incomes'],
    }),

    getUserIncomes: build.query<TransactionResponse[], void>({
      query: () => INCOME_URL,
      // Generates cache tags for each income item fetched
      // See: https://redux-toolkit.js.org/rtk-query/usage/examples
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Incomes' as const, _id })),
              { type: 'Incomes', _id: 'LIST' },
            ]
          : [{ type: 'Incomes', id: 'LIST' }],
      // For each fetched income, creates a cache tag of type 'Incomes' using the _id
      // These tags are used for caching and data invalidation purposes
    }),

    getIncome: build.query<TransactionResponse, string>({
      query: (_id) => `${INCOME_URL}/${_id}`,
      providesTags: (_id) => [{ type: 'Incomes', _id }],
    }),

    deleteIncome: build.mutation<void, { _id: string }>({
      query: ({ _id }) => ({
        url: `${INCOME_URL}/${_id}`, // Assuming API endpoint for deleting a specific income
        method: 'DELETE',
        body: { _id },
      }),
      invalidatesTags: ['Incomes'],
    }),
    updateIncome: build.mutation<void, { data: TransactionResponse }>({
      query: ({ data }) => ({
        url: `${INCOME_URL}/${data._id}`, // Assuming API endpoint for updating a specific income
        method: 'PATCH', // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating
        body: { ...data }, // Send the updated data to the server
      }),
      invalidatesTags: ['Incomes'],
    }),
  }),
});

export const {
  useCreateIncomeMutation,
  useGetUserIncomesQuery,
  useDeleteIncomeMutation,
  useUpdateIncomeMutation,
  useGetIncomeQuery,
} = incomesApi;
