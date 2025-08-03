import React, { createContext, useContext, useReducer } from 'react';

const ThemeStateContext = createContext();
const ThemeDispatchContext = createContext();

const initialState = { theme: 'neutral' };

function themeReducer(state, action) {
  switch(action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'neutral' ? 'light' : 'neutral'
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
}

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (context === undefined) throw new Error('useThemeState must be used within ThemeProvider');
  return context;
};

export const useThemeDispatch = () => {
  const context = useContext(ThemeDispatchContext);
  if (context === undefined) throw new Error('useThemeDispatch must be used within ThemeProvider');
  return context;
};

export const useToggleTheme = () => {
  const dispatch = useThemeDispatch();
  return () => dispatch({ type: 'TOGGLE_THEME' });
};
