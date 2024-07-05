// import React, { useState, ReactNode } from 'react';
// import { ThemeProvider } from '@mui/material';
// import { themeCreator } from './base';
// import { StylesProvider } from '@mui/styles';

// const ThemeProviderWrapper: React.FC<{ children: ReactNode }> = (props) => {
//   const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
//   const [themeName, _setThemeName] = useState(curThemeName);
//   const theme = themeCreator(themeName);

//   return (
//     <StylesProvider injectFirst>
//       <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
//     </StylesProvider>
//   );
// };

// export default ThemeProviderWrapper;
