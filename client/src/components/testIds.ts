const sidebar = (testId: string) => {
  return `sidebar-listItem-${testId}`;
};

export const testIds = {
  sidebarListItem: {
    container: sidebar('container'),
    title: sidebar('title'),
  },
};
