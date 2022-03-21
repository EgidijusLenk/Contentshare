import React, { useState } from 'react';
import axios from 'axios';
import {
    Navigate,
  } from "react-router-dom";

function LoginUser() {
    const [inputs, setInputs] = useState({"username":"","password":"", "grant_type": "password"});
    const [token, setToken] = useState("");
    function handleSubmit(event) {
        const headers = {
            'Content-accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',
          }
        event.preventDefault();
        console.log(`${JSON.stringify(inputs)}`)
        const loginFormData = new FormData();
        loginFormData.append("username", inputs.username)
        loginFormData.append("password", inputs.password)
      
        axios.post("http://localhost:8000/token", loginFormData, {headers: headers})
        .then(function (res) {
            setToken(res.data.access_token);
            localStorage.setItem("token", res.data.access_token);
            console.log(`${res.data.access_token} TTTT`) })

        
        .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`))
        //gotto redirect user to dashboard
    }
    function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log(`${event.target.value} zzzzzz`)
        console.log(`${JSON.stringify(inputs)} aaaaaa`)
    }
    return (
        <div>
            <span> Login user</span>
            {token && (
          <Navigate to="/dashboard" replace={true} />
        )}
            <form onSubmit={handleSubmit}>
                <label>
                Username:
                <input type="text" name="username" onChange={handleInputChange} value={inputs.username}/>
                </label><br/>
                <label>
                Password:
                <input type="text" name="password" onChange={handleInputChange} value={inputs.password}/>
                </label><br/>
                <button type="submit">Submit</button>   
            </form> 
        </div>
    )

}

export default LoginUser