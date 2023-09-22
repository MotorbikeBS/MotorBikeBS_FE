import React from 'react';
import ReactDOM from 'react-dom/client';
import './apps/index.css';
import App from './apps/App';
import { Provider } from 'react-redux';
import { store } from './services/store/store';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

