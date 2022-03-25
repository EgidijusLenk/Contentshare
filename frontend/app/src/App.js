import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import React, { useState,  } from 'react';
// import axios from 'axios';
// import PersonList from './components/PersonList';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import LogoutUser from './components/LogoutUser';
import Dashboard from './components/Dashboard';
// import NewEmployee from './components/test';
export const AuthContext = React.createContext();


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
      console.log(`token: ${action.payload.access_token} user: ${action.payload.user}`)
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

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <div className="App">
      
      {}
      {/* <Link to="/signup" >Signup</Link> |{" "}
      {state ? (
          <Link to="/logout" >Logout</Link>
        ) : <Link to="/login" >Login</Link>}
       */}
      <br/>
      {!state.isAuthenticated ? <LoginUser /> : <Dashboard />}


      <Outlet />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
