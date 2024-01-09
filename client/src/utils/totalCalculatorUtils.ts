import { TransactionResponse } from '@/redux/types';
import { numberToCurrency } from './currencyUtils';

export const getTotalAmount = (
  dataList: TransactionResponse[] | undefined
): string => {
  if (!dataList || dataList.length === 0) {
    return numberToCurrency(0); // Return zero if dataList is undefined or empty
  }

  const total = dataList.reduce((acc: number, data: TransactionResponse) => {
    const dataAmount = Number(data.amount);
    return !isNaN(dataAmount) ? acc + dataAmount : acc; // Ignore non-numeric values
  }, 0);
  return numberToCurrency(total);
};
