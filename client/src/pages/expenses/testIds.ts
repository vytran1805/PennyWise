const Expenses = (testId: string) => {
  return `expenses-${testId}`;
};
const MainSection = (testId: string) => {
  return Expenses(`-mainSection-${testId}`);
};
const RightSection = (testId: string) => {
  return Expenses(`-rightSection-${testId}`);
};
export const testIds = {
  expenses: {
    container: Expenses('container'),
    mainContainer: {
      container: MainSection('container'),
      expensesTable: MainSection('expensesTable'),
    },
    rightContainer: {
      container: RightSection('container'),
    },
  },
};
