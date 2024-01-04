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
export interface ExpenseResponse {
  _id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  __v: number;
}

export interface ExpenseData {
  date?: string;
  name?: string;
  description?: string;
  amount?: number;
  category?: string;
}
