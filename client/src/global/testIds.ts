const sidebar = (testId: string) => {
  return `sidebar-${testId}`;
};
export const testIds = {
  sidebar: {
    container: sidebar('container'),
    menu: sidebar('menu'),
    listItemContainer: sidebar('listItem-container'),
  },
};
