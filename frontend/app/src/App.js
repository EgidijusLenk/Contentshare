import logo from './logo.svg';
import './App.css';
import { Outlet, Link, useLocation } from "react-router-dom";
import React, { useState,  } from 'react';
// import axios from 'axios';
// import PersonList from './components/PersonList';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import LogoutUser from './components/LogoutUser';
import Dashboard from './components/Dashboard';
import TopNav from './components/TopNav';
import Hello from './components/Hello';
import {
  Container,
  Box,
} from '@chakra-ui/react';
// import NewEmployee from './components/test';
export const AuthContext = React.createContext();
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("user", action.payload.user);
      // console.log(`token: ${action.payload.access_token} user: ${action.payload.user}`)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.access_token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  let location = useLocation();

  return (
<Box w='100%'  bg='gray.50' >
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <div className="App">
      <TopNav authState={state} />
      {/* <br/>Authenticated? {state.isAuthenticated ? "yes" : "no"} */}
      {/* <Sidebar authState={state.isAuthenticated}/> */}
      {/* {!state.isAuthenticated ? <Hello /> : <Dashboard />} */}
      {location.pathname === "/" ? <Hello /> : ""}

      <Outlet />
    </div>
    </AuthContext.Provider>
    </Box>
  );
}

export default App;
