/**********************************
 * Identify the type that we need *Expense
 **********************************/

export enum ExpenseType {
  Expenses = 'Expense',
  Income = 'Income',
}
/**
 * Structure of Income/Expense data from the server
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

/**
 * Structure of Income/Expense Data that BEING SENT back to the server
 */
export interface TransactionData {
  date?: Date;
  name?: string;
  description?: string;
  amount?: number;
  category?: string;
}
