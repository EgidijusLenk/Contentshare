import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ChakraProvider } from '@chakra-ui/react'


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
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="logout" element={<LogoutUser />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="signup" element={<RegisterUser />} />
          </Route>
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
