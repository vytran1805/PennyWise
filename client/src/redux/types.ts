/**********************************
 * Identify the type that we need *
 **********************************/

export enum TransactionType {
  Expenses = 'Expense',
  Income = 'Income',
}
/**
 * this interface represents the KPI obj that we want the response to look like
 * Note: used in api.ts
 */
export interface TransactionsResponse {
  _id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  type: TransactionType;
  __v: number;
}

export interface TransactionData {
  date?: string;
  name?: string;
  type?: TransactionType;
  description?: string;
  amount?: number;
  category?: string;
}
