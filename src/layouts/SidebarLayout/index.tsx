import  { FC, ReactNode } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarLayoutProps {
  children?: ReactNode;
  userType: 'admin' | 'user';
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ userType }) => {
  const theme = useTheme();

  const background = "#000000"

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',
          '.MuiPageTitle-wrapper': {
            background: background,
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha?.black?.[100] || '#000000',
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha?.black?.[100] || '#000000',
                    0.05
                  )}`,
          },
        }}
      >
        <Header />
        <Sidebar userType={userType} />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`,
            },
          }}
        ></Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
