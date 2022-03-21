import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";
// import axios from 'axios';
// import PersonList from './components/PersonList';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import LogoutUser from './components/LogoutUser';
import Dashboard from './components/Dashboard';
// import NewEmployee from './components/test';
function  deltoken(){
  localStorage.removeItem("token")
}
function App() {
  const token = localStorage.getItem("token")
  return (
    <div className="App">
      <Link to="/signup"  >Signup</Link> |{" "}
      {token ? (
          <Link to="/logout">Logout</Link>
        ) : <Link to="/login">Login</Link>}
      
      <br/>
      zzz
      {/* <RegisterUser/>
      <br/>
      <LoginUser/> */}
      <Outlet />

      <br/>
      {/* <LogoutUser/> */}
      <br/>
      {/* <Dashboard/> */}
      
      {/* <NewEmployee /> */}
    </div>
  );
}

export default App;
