import { TransactionResponse } from '@/redux/types';
import { numberToCurrency } from '@/utils/currencyUtils';
import { sortDates } from '@/utils/dateUtils';

export const useGetTotalAmountByDate = (
  transactions: TransactionResponse[] | undefined
) => {
  if (!transactions || transactions.length === 0) {
    return [];
  }
  // The Set object stores unique values => it automatically removes duplicate values
  const uniqueDates = [
    ...new Set(transactions.map((transaction: any) => transaction.date)),
  ];

  const resultArray = Array.from(uniqueDates)
    .sort(sortDates)
    .map((date) => {
      // Filter transactions for the current date
      const transactionsOnDate = transactions.filter(
        (transaction) => transaction.date === date
      );

      // Calculate total amount for the current date
      const totalAmount = transactionsOnDate.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      return {
        date,
        totalAmount: numberToCurrency(totalAmount),
      };
    });

  return resultArray;
};
