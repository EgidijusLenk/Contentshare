import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [items, setItems] = useState([])
    const [user, setUser] = useState([])
    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer`
      }
      
    function showContent(){
        console.log(headers)
        headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
        axios.get("http://localhost:8000/users/me", {headers: headers})
        .then(res => { setItems(res.data.contents);setUser(res.data)})
        .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`))
    }
    useEffect(showContent, []);
    if (!items) return null;
    const domain = window.location.hostname
    return (
        <div>
            Dashboard
            <br/>
            <button onClick={showContent}>Show content</button>
            <ul>x
                <br/>
               {user.user}
               {items.map((item, key) => {
                        return <li key={key}>{item.owner_id} - {item.content_url} - {domain}/{item.shortened_url}</li>
                    })}
               
            </ul>
        </div>

    )
}


export default Dashboard