import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { useAuthStore } from './store/authStore';

const initializeApp = async () => {
  const token = useAuthStore.getState().token;
  if (token) {
    await useAuthStore.getState().fetchUserInfo(token);
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initializeApp();