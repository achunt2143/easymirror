import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import { ThemeProvider, useThemeState } from './reducers/ThemeContext';
import reportWebVitals from './reportWebVitals';

// Wrap App with ThemeDecorator once
const DecoratedApp = ThemeDecorator(App);

const ThemedAppRoot = () => {
  const {theme} = useThemeState();

  return (
    <DecoratedApp skin={theme} />
  );
};

const Root = () => (
  <ThemeProvider>
    <ThemedAppRoot />
  </ThemeProvider>
);

// Render to DOM
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);

reportWebVitals();
