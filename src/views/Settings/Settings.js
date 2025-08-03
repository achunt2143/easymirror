import React from 'react';
import SettingsBase from './SettingsBase';
import {useThemeState, useToggleTheme} from '../../reducers/ThemeContext'; // Adjust path if needed

const Settings = () => {
  const {theme} = useThemeState();
  const toggleTheme = useToggleTheme(); // Dispatches TOGGLE_THEME

  return (
    <SettingsBase
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
};

export default Settings;
