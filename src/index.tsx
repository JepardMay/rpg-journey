import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

import 'normalize.css';
import './assets/styles/global/fonts.css';
import './assets/styles/global/variables.css';
import './assets/styles/global/global.css';
import './assets/styles/global/themes.css';
import './assets/styles/global/animations.css';
import './assets/styles/global/common.css';
import './assets/styles/global/colors.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
