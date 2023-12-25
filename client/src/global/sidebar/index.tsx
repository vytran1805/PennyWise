import { useState } from 'react';
import { Sidebar as ProSidebar, Menu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import {
  HomeOutlined,
  PeopleOutlined,
  ContactsOutlined,
  ReceiptOutlined,
  PersonOutlined,
  CalendarTodayOutlined,
  HelpOutlineOutlined,
  MenuOutlined,
} from '@mui/icons-material';
import { SidebarListItem } from '@/components/SidebarListItem';
import { sidebarItems } from '@/data/SidebarData';

export const Sidebar = () => {
  const { palette } = useTheme();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('Dashboard');

  // Array of sidebar items
  const sidebarListItems = [
    {
      title: 'Manage Team',
      to: '/team',
      icon: <PeopleOutlined />,
    },
    {
      title: 'Contacts Information',
      to: '/contacts',
      icon: <ContactsOutlined />,
    },
    {
      title: 'Invoices Balances',
      to: '/invoices',
      icon: <ReceiptOutlined />,
    },
  ];

  const handleListItemOnClick = (title: string) => {
    setSelected(title);
    console.log('Clicked on ', title);
  };

  return (
    <Box
      sx={{
        '& .ps-sidebar-container': {
          background: `${palette.primary[300]} !important`, //background of the sidebar
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{ display: 'flex', width: '100%' }}
      >
        <Menu style={{ display: 'flex', width: '100%' }}>
          {isCollapsed ? (
            <IconButton
              name='MenuOutlined'
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <MenuOutlined />
            </IconButton>
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
          )}
          {/* {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  alt='profile-user'
                  width='100px'
                  height='100px'
                  src={`../../assets/user.png`}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h2'
                  //   color={palette.grey[100]}
                  fontWeight='bold'
                  //   sx={{ m: '10px 0 0 0' }}
                >
                  Ed Roh
                </Typography>
                <Typography variant='h5' color={palette.secondary[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )} */}

          <Box>
            {sidebarListItems.map((item, index) => {
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
            {/* <SidebarListItem
              title='Dashboard'
              to='/'
              icon={<HomeOutlined />}
              selected={selected}
              isCollapsed={isCollapsed}
              onClick={() => handleListItemOnClick(title)}
            />

            <Typography
              variant='h6'
              //   color={palette.grey[300]}
              //   sx={{ m: '15px 0 5px 20px' }}
              sx={{ textAlign: 'center' }}
            >
              Data
            </Typography>
            <SidebarListItem
              title='Manage Team'
              to='/team'
              icon={<PeopleOutlined />}
              selected={selected}
              isCollapsed={isCollapsed}
              onClick={() => handleListItemOnClick(title)}
            />
            <SidebarListItem
              title='Contacts Information'
              to='/contacts'
              icon={<ContactsOutlined />}
              selected={selected}
              isCollapsed={isCollapsed}
              onClick={() => handleListItemOnClick(title)}
            />
            <SidebarListItem
              title='Invoices Balances'
              to='/invoices'
              icon={<ReceiptOutlined />}
              selected={selected}
              isCollapsed={isCollapsed}
              onClick={() => handleListItemOnClick(title)}
            />

            <Typography
              variant='h6'
              //   color={palette.grey[300]}
              //   sx={{ m: '15px 0 5px 20px' }}
            >
              Pages
            </Typography>
            <SidebarListItem
              title='Profile Form'
              to='/form'
              icon={<PersonOutlined />}
              selected={selected}
              isCollapsed={isCollapsed}
              onClick={() => handleListItemOnClick(title)}
            />
            <SidebarListItem
              title='Calendar'
              to='/calendar'
              icon={<CalendarTodayOutlined />}
              selected={selected}
              isCollapsed={isCollapsed}
              onClick={() => handleListItemOnClick(title)}
            />
            <SidebarListItem
              title='FAQ Page'
              to='/faq'
              icon={<HelpOutlineOutlined />}
              selected={selected}
              isCollapsed={isCollapsed}
              onClick={() => handleListItemOnClick(title)}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
