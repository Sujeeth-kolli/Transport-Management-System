import { useContext } from 'react';
import { List, Box, ListItem, styled, Button, alpha } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';


import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RouteIcon from '@mui/icons-material/Route';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Import the icon for "Create User"
import { SidebarContext } from '../../../../contexts/SidebarContext';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};
  }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => ({
    '.MuiList-root': {
      '.MuiListItem-root': {
        padding: theme.spacing(1, 0),

        '.MuiButton-root': {
          display: 'flex',
          color: theme.palette.common.white,
          backgroundColor: 'transparent',
          width: '100%',
          justifyContent: 'flex-start',
          padding: theme.spacing(1.2, 3),

          '.MuiButton-startIcon': {
            color: theme.palette.grey[300],
            fontSize: theme.typography.pxToRem(20),
            marginRight: theme.spacing(1),
          },

          '&.active, &:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.06),
            color: theme.palette.common.white,
            '.MuiButton-startIcon': {
              color: theme.palette.common.white,
            },
          },
        },
      },
    },
  })
);

interface SidebarMenuProps {
  userType: 'admin' | 'user'; // Define the type explicitly
}

function SidebarMenu({ userType }: SidebarMenuProps) {
  const { closeSidebar } = useContext(SidebarContext);

  const adminItems = [
    { to: '/dashboards/Admin', icon: <DashboardIcon />, label: 'Dashboard' },
    { to: '/management/termpage', icon: <CalendarMonthIcon />, label: 'Term' },
    {
      to: '/management/PassRequesteddetails',
      icon: <DirectionsBusIcon />,
      label: 'Bus pass requests',
    },
    { to: '/management/stops', icon: <PlaceIcon />, label: 'Stops' },
    { to: '/management/busstages', icon: <RouteIcon />, label: 'Routes' },
    {
      to: '/management/createuser',
      icon: <PersonAddIcon />,
      label: 'Create User',
    },
  ];

  const userItems = [
    { to: '/dashboards/User', icon: <DashboardIcon />, label: 'Dashboard' },
    { to: '/dashboards/profile', icon: <AccountCircleIcon />, label: 'Profile' },
    { to: '/dashboards/routes', icon: <RouteIcon />, label: 'Routes' },
    {
      to: '/dashboards/buspassdetails',
      icon: <ListAltIcon />,
      label: 'Bus pass details',
    },
    {
      to: '/dashboards/buspassrequest',
      icon: <DirectionsBusIcon />,
      label: 'Bus pass request',
    },
  ];

  const menuItems = userType === 'admin' ? adminItems : userItems;

  return (
    <MenuWrapper>
      <List component="div">
        <SubMenuWrapper>
          <List component="div">
            {menuItems.map((item) => (
              <ListItem component="div" key={item.to}>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to={item.to}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </SubMenuWrapper>
      </List>
    </MenuWrapper>
  );
}

export default SidebarMenu;