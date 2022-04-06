import React, { useState, useEffect } from "react";
import axios from "axios";

import { Outlet, Link, useNavigate } from "react-router-dom";
function RegisterUser() {
  const [inputs, setInputs] = useState({ user: "", email: "", password: "" });
  let navigate = useNavigate();
  function handleSubmit(event) {
    const headers = {
      "Content-accept": "application/json",
      "Content-Type": "application/json",
    };
    event.preventDefault();
    console.log(`${JSON.stringify(inputs)}`);
    axios
      .post("http://localhost:8000/users", JSON.stringify(inputs), {
        headers: headers,
      })
      .then(function (res) {
        alert(`${res.data.user} account created`);
        navigate("/", { replace: true });
      })
      .catch((err) => alert(`${err.response.data.detail}`));
  }
  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }
  return (
    <div>
      <div className="auth-wrapper mt-4">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Register new user</h3>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                name="user"
                onChange={handleInputChange}
                value={inputs.username}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                onChange={handleInputChange}
                value={inputs.email}
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
              Register
            </button>
            <p className="forgot-password text-right">
              <span> Already have an account? </span>
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterUser;
