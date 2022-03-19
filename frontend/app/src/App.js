import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
// import PersonList from './components/PersonList';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import LogoutUser from './components/LogoutUser';
import Dashboard from './components/Dashboard';
import CreateContent from './components/CreateContent';
function App() {
  return (
    <div className="App">
      
      zzz
      <RegisterUser/>
      <br/>
      <LoginUser/>

      <br/>
      <LogoutUser/>
      <br/>
      <Dashboard/>
      <br/>
      <CreateContent/>
      
    </div>
    
  );
}

export default App;
