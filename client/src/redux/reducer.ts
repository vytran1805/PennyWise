import { TransactionsResponse } from '@/redux/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  transactions: TransactionsResponse[];
}
const initialState: InitialState = {
  transactions: [],
};
export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    getAllTransactions: (
      state,
      action: PayloadAction<TransactionsResponse[]>
    ) => {
      state.transactions = action.payload;
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const transactionIdToDelete = action.payload;
      state.transactions = state.transactions.filter(
        (transaction) => transaction._id !== transactionIdToDelete
      );
    },
  },
});
