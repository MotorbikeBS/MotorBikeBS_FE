import React from 'react';
import { Typography } from '@mui/material'
import './App.css';
import LoginComponent from '../pages/login-component/LoginComponent';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../router';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
