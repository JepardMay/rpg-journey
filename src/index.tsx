import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'normalize.css';
import './styles/fonts.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/themes.css';
import './styles/animations.css';
import './styles/common.css';
import './styles/colors.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
