const Transactions = (testId: string) => {
  return `transactions-${testId}`;
};
const MainSection = (testId: string) => {
  return Transactions(`-mainSection-${testId}`);
};
const RightSection = (testId: string) => {
  return Transactions(`-rightSection-${testId}`);
};
export const testIds = {
  transactions: {
    container: Transactions('container'),
    mainContainer: {
      container: MainSection('container'),
      transactionsTable: MainSection('transactionsTable'),
    },
    rightContainer: {
      container: RightSection('container'),
    },
  },
};
