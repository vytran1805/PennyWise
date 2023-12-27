const Sidebar = (testId: string) => {
  return `sidebar-${testId}`;
};
export const testIds = {
  sidebar: {
    container: Sidebar('container'),
    menu: Sidebar('menu'),
    listItemContainer: Sidebar('listItem-container'),
  },
};
