import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
    const [inputs, setInputs] = useState({"user":"","email":"","password":""});
    //cia reikia panaudoti useState kai forma submitinta
    function handleSubmit(event) {
        const headers = {
            'Content-accept': 'application/json',
            'Content-Type': 'application/json'
          }
        event.preventDefault();
        console.log(`${JSON.stringify(inputs)}`)
        axios.post("http://localhost:8000/users", JSON.stringify(inputs), {headers: headers})
        .catch(err => alert(`${err.response.data.detail}`))
          
    }
    function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    return (
        <div>
            <span> Register new user</span>
            <form onSubmit={handleSubmit}>
                <label>
                Username:
                <input type="text" name="user" onChange={handleInputChange} value={inputs.username}/>
                </label><br/>
                <label>
                Email:
                <input type="text" name="email" onChange={handleInputChange} value={inputs.email}/>
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
export default RegisterUser