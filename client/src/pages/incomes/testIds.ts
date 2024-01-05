const Incomes = (testId: string) => {
  return `incomes-${testId}`;
};
const MainSection = (testId: string) => {
  return Incomes(`-mainSection-${testId}`);
};
const RightSection = (testId: string) => {
  return Incomes(`-rightSection-${testId}`);
};
export const testIds = {
  incomes: {
    container: Incomes('container'),
    mainContainer: {
      container: MainSection('container'),
      incomesTable: MainSection('incomesTable'),
    },
    rightContainer: {
      container: RightSection('container'),
    },
  },
};
