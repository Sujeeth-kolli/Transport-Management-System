import { useContext } from 'react';
import Scrollbar from '../../../components/Scrollbar';
import { SidebarContext } from '../../../contexts/SidebarContext';
import {
  Box,
  Drawer,
  alpha,
  styled,
  useTheme,
  lighten,
  darken
} from '@mui/material';

import SidebarMenu from './SidebarMenu';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    width: ${theme.sidebar.width};
    min-width: ${theme.sidebar.width};
    color: ${theme.colors.alpha?.trueWhite?.[70] || '#FFFFFF'};
    position: relative;
    z-index: 7;
    height: 100%;
    padding-bottom: 68px;
`
);

interface SidebarProps {
  userType: 'admin' | 'user'; // Define the type explicitly
}

function Sidebar({ userType }: SidebarProps) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  const background =
    theme.palette.mode === 'dark'
      ? alpha(lighten(theme.header.background || '#FFFFFF', 0.1), 0.5)
      : darken(theme.colors.alpha?.black?.[100] || '#000000', 0.5);

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background: background,
          boxShadow: theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52
              }}
            ></Box>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img height={50} src="/static/logo/tms.svg" alt="Logo" />
          </div>
          <SidebarMenu userType={userType} />
        </Scrollbar>
        <Box p={2}></Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha?.white?.[100] || '#FFFFFF'
                : darken(theme.colors.alpha?.black?.[100] || '#000000', 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                {/* <Logo /> */}
              </Box>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img height={100} src="/static/logo/tms.svg" alt="Logo" />
            </div>
            <SidebarMenu userType={userType} />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
