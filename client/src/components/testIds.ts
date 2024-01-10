const Sidebar = (testId: string) => {
  return `sidebar-listItem-${testId}`;
};
const AddButton = (testId: string) => {
  return `add-button-${testId}`;
};

export const testIds = {
  sidebarListItem: {
    container: Sidebar('container'),
    title: Sidebar('title'),
  },
  addRecordButton: {
    container: AddButton('container'),
  },
};
