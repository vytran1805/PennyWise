import { ListItemButton, ListItemText } from '@mui/material';

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
      selected={selected === title}
      sx={{ display: 'flex', gap: 2 }}
      onClick={() => onClick(title)}
    >
      {icon}
      {!isCollapsed && <ListItemText>{title}</ListItemText>}
    </ListItemButton>
  );
};
