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
  date: Date;
  category: string;
  description: string;
  __v: number;
}

export interface ExpenseData {
  date?: Date;
  name?: string;
  description?: string;
  amount?: number;
  category?: string;
}

export interface IncomeResponse {
  _id: string;
  name: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
  __v: number;
}

export interface IncomeData {
  date?: Date;
  name?: string;
  description?: string;
  amount?: number;
  category?: string;
}
