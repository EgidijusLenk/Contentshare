import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

import { Outlet, Link } from "react-router-dom";
function LoginUser() {
  const { dispatch } = React.useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    grant_type: "password",
  });
  const [token, setToken] = useState("");
  let navigate = useNavigate();
  function handleSubmit(event) {
    const headers = {
      "Content-accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    };
    event.preventDefault();
    // console.log(`${JSON.stringify(inputs)}`)
    const loginFormData = new FormData();
    loginFormData.append("username", inputs.username);
    loginFormData.append("password", inputs.password);

    axios
      .post("http://localhost:8000/token", loginFormData, { headers: headers })
      .then(function (res) {
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        navigate("/dashboard");
      })
      .catch((err) => alert(`${JSON.stringify(err.response.data.detail)}`));
  }
  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(`${event.target.value} zzzzzz`)
    // console.log(`${JSON.stringify(inputs)} aaaaaa`)
  }
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                name="username"
                onChange={handleInputChange}
                value={inputs.username}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
                value={inputs.password}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-2">
              Login
            </button>
          </form>
          <p className="forgot-password text-right">
            <span> Dont have an account? </span>
            <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
