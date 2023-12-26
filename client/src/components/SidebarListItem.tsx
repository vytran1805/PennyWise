import { ListItemButton, ListItemText } from '@mui/material';
import { testIds } from './testIds';

type Props = {
  title: string;
  to: string;
  isCollapsed: boolean;
  icon: JSX.Element;
  selected: string;
  onClick: (title: string) => void;
};
export const SidebarListItem = (props: Props) => {
  const { title, icon, isCollapsed, selected, onClick } = props;
  return (
    <ListItemButton
      data-test-id={testIds.sidebarListItem.container}
      selected={selected === title}
      sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}
      onClick={() => onClick(title)}
    >
      {icon}
      {!isCollapsed && (
        <ListItemText data-test-id={testIds.sidebarListItem.title}>
          {title}
        </ListItemText>
      )}
    </ListItemButton>
  );
};
