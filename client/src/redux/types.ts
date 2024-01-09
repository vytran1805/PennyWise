/**********************************
 * Identify the type that we need *Expense
 **********************************/

export enum ExpenseType {
  Expenses = 'Expense',
  Income = 'Income',
}
/**
 * this interface represents the KPI obj that we want the response to look like
 * Note: used in api.ts
 */
export interface TransactionResponse {
  _id: string;
  name: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
  __v: number;
}

export interface TransactionData {
  date?: Date;
  name?: string;
  description?: string;
  amount?: number;
  category?: string;
}
