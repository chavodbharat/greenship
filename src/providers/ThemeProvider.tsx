import React, {createContext, useContext, useEffect, useState} from 'react';
import {Appearance} from 'react-native';

import {darkColors, lightColors} from '../theme/colors';
import {ColorSchemesEnums} from '../enums/colorSchemesEnums/ColorSchemesEnums';
import useAppState from '../theme/useAppState';

export const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = ({children}: any) => {
  const [colorSchemeState, setColorSchemeState] = useState(
    ColorSchemesEnums.light,
  );
  useAppState({
    onForeground: () => {
      const colorScheme: any = Appearance.getColorScheme();
      setColorSchemeState(colorScheme);
      setIsDark(colorScheme === 'dark');
    },
  });

  const [isDark, setIsDark] = useState(
    colorSchemeState === ColorSchemesEnums.dark,
  );

  // Listening to changes of device appearance while in run-time
  useEffect(() => {
    const colorScheme: any = Appearance.getColorScheme();
    setColorSchemeState(colorScheme);
    setIsDark(colorScheme === 'dark');
  }, []);

  const defaultTheme = {
    colorScheme: colorSchemeState,
    isDark,
    // Chaning color schemes according to theme
    colors: isDark ? darkColors : lightColors,
    // Overrides the isDark value will cause re-render inside the context.
    setScheme: (scheme: any) => setIsDark(scheme === ColorSchemesEnums.dark),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);