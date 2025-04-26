import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.jsx';
import './index.css';
import './assets/css/darkMode.css'; // Import dark mode styles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './i18n'; // Import i18n configuration

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <App />
        <ToastContainer position="top-right" />
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>
);
