import { useState } from 'react';
import { Sidebar as ProSidebar, Menu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { SidebarListItem } from '@/components/sidebar/SidebarListItem';
import { sidebarItems } from '@/data/SidebarData';
import { testIds } from '../testIds';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const { palette } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('Dashboard');
  const navigate = useNavigate();

  const handleListItemOnClick = (title: string) => {
    setSelected(title);
    navigate(`/${title.toLowerCase()}`);
    console.log('Clicked on ', title);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderSidebarHeader = () => {
    if (isCollapsed) {
      return (
        <Box display='flex' justifyContent='center'>
          <IconButton name='MenuOutlined' onClick={toggleCollapse}>
            <MenuOutlined />
          </IconButton>
        </Box>
      );
    }
    return (
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        ml='15px'
      >
        <Typography variant='h3'>ADMIN</Typography>
        <IconButton onClick={toggleCollapse}>
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
          background: `${palette.primary[300]} !important`, // Background of the sidebar
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
          {renderSidebarHeader()}
          {sidebarItems.map((item, index) => (
            <SidebarListItem
              key={index}
              title={item.title}
              to={''}
              isCollapsed={isCollapsed}
              icon={item.icon}
              selected={selected}
              onClick={() => handleListItemOnClick(item.title)}
            />
          ))}
        </Menu>
      </ProSidebar>
    </Box>
  );
};
