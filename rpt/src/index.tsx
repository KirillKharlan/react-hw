import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LocalizationProvider } from './shared/context/LocalizationContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);

export {};