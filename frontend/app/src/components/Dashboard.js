import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CreateContent from './CreateContent';
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
        headers["Authorization"] =  `Bearer ${localStorage.getItem("token")}`
        axios.get("http://localhost:8000/users/me", {headers: headers})
        .then(res => { setItems(res.data.contents);setUser(res.data)})
        .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`))
    }
    useEffect(showContent, [CreateContent]);
    if (!items) return null;

  
    const domain = window.location.hostname
    return (
        <div>
            Dashboard
            <br/>
            {user.length >= 0 && <button onClick={showContent}>Show content</button> }
            <br/>
            
              Your username: {user.user}
            <br/>
            <br/>
      <CreateContent updateTable={showContent}/>
            <ul>
                <br/>
               {items.map((item, key) => {
                        return <li key={key}>{item.owner_id} - {item.content_url} - {domain}/{item.shortened_url}</li>
                    })}
               
            </ul>
        </div>

    )
}


export default Dashboard