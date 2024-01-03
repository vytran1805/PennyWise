/**********************************
 * Identify the type that we need *
 **********************************/

enum TransactionType {
  Expenses = 'Expenses',
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
  name?: string;
  type?: string;
  description?: string;
  amount?: number;
  // date?: Date;
  category?: string;
}
