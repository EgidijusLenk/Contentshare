import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import Dashboard from './components/Dashboard';
import LogoutUser from './components/LogoutUser';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
        <Route path="signup" element={<RegisterUser />} />
        <Route path="login" element={<LoginUser />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="logout" element={<LogoutUser />} />
        </Route>
        {/* <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
