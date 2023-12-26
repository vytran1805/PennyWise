import { useState } from 'react';
import { Sidebar as ProSidebar, Menu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import {

  MenuOutlined,
} from '@mui/icons-material';
import { SidebarListItem } from '@/components/SidebarListItem';
import { sidebarItems } from '@/data/SidebarData';
import { testIds } from '../testIds';

export const Sidebar = () => {
  const { palette } = useTheme();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('Dashboard');

  // Array of sidebar items
  // const sidebarListItems = [
  //   {
  //     title: 'Manage Team',
  //     to: '/team',
  //     icon: <PeopleOutlined />,
  //   },
  //   {
  //     title: 'Contacts Information',
  //     to: '/contacts',
  //     icon: <ContactsOutlined />,
  //   },
  //   {
  //     title: 'Invoices Balances',
  //     to: '/invoices',
  //     icon: <ReceiptOutlined />,
  //   },
  // ];

  const handleListItemOnClick = (title: string) => {
    setSelected(title);
    console.log('Clicked on ', title);
  };
  const handleSidebarOnCollapsed = () => {
    return isCollapsed ? (
      <Box display='flex' justifyContent='center'>
        <IconButton
          name='MenuOutlined'
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <MenuOutlined />
        </IconButton>
      </Box>
    ) : (
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        ml='15px'
      >
        <Typography variant='h3'>ADMIN</Typography>
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuOutlined />
        </IconButton>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: 'flex',
        '& .ps-sidebar-container': {
          background: `${palette.primary[300]} !important`, //background of the sidebar
          // width: '100%',
        },
        '& .css-ewdv3l': {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <ProSidebar
        data-test-id={testIds.sidebar.container}
        collapsed={isCollapsed}
      >
        <Menu data-test-id={testIds.sidebar.menu}>
          {handleSidebarOnCollapsed()}
          {sidebarItems.map((item, index) => {
            return (
              <SidebarListItem
                key={index}
                title={item.title}
                to={''}
                isCollapsed={isCollapsed}
                icon={item.icon}
                selected={selected}
                onClick={() => handleListItemOnClick(item.title)}
              />
            );
          })}
        </Menu>
      </ProSidebar>
    </Box>
  );
};
