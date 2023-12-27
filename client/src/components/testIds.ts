const Sidebar = (testId: string) => {
  return `sidebar-listItem-${testId}`;
};

export const testIds = {
  sidebarListItem: {
    container: Sidebar('container'),
    title: Sidebar('title'),
  },
};
