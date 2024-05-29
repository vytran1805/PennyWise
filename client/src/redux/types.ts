/**********************************
 * Identify the type that we need *Expense
 **********************************/

export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income',
}
/**
 * Structure of Income/Expense data from the server
 * Note: used in api.ts
 */
export interface TransactionResponse {
  _id: string;
  user_id: string;
  name: string;
  description: string;
  amount: number;
  date: Date;
  category_id: string;
  type: TransactionType;
  __v: number;
}

/**
 * Structure of Income/Expense Data that BEING SENT back to the server
 */
export interface TransactionData {
  user_id: string;
  name?: string;
  description?: string;
  amount?: number;
  date?: Date;
  category_id?: string;
  type?: TransactionType;
}

/**
 * Structure of Category data from the server
 * Note: used in api.ts
 */
export interface CategoryResponse {
  _id: string;
  name: string;
  type: string;
  __v: number;
}
