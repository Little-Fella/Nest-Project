import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from './components/register/RegisterPage';
import LoginPage from './components/login/LoginPage';
import reportWebVitals from './reportWebVitals';
import { Header } from './components/header/Header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegisterPage />} />
      </Routes>
    </Router>
);

reportWebVitals();
