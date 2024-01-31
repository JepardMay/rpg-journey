import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'normalize.css';
import './styles/global.css';
import './styles/themes.css';
import './styles/animations.css';
import './styles/common.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
