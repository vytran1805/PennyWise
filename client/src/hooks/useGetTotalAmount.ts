import { TransactionResponse } from '@/redux/types';
import { numberToCurrency } from '@/utils/currencyUtils';

export const useGetTotalAmount = (
  transactions: TransactionResponse[] | undefined
) => {
  if (!transactions || transactions.length === 0) {
    return 0; // Return zero if dataList is undefined or empty
  }

  const total = transactions.reduce(
    (acc: number, data: TransactionResponse) => {
      const dataAmount = Number(data.amount);
      return !isNaN(dataAmount) ? acc + dataAmount : acc; // Ignore non-numeric values
    },
    0
  );
  return total;
};
