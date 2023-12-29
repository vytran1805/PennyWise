// Define an enum for your ID types
export enum IdType {
  Name = 'name',
  Date = 'date',
  Description = 'description',
  Category = 'category',
  Amount = 'amount',
  // Action = 'action',
}
export interface BudgetColumn {
  id?: IdType;
  label: string;
  minWidth?: number;
  align?: string;
  format?: (value: number) => string;
}
