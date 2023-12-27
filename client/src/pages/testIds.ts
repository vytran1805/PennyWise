const Budgets = (testId: string) => {
  return `budgets-${testId}`;
};

export const testIds = {
  budgets: {
    container: Budgets('container'),
    mainContainer: Budgets('main-container'),
    rightContainer: Budgets('details-container'),
  },
};
