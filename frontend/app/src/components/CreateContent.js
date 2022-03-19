import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateContent() {
    const [content_url, setContenturl] = useState();
    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer`
      }
      function handleSubmit(event) {
        const headers = {
            'Content-accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer`
          }
        headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`  
        event.preventDefault();
        axios.post("http://localhost:8000/content", {"content_url":content_url}, {headers: headers})
        .then(res => alert(`Content created, short link: ${res.data.shortened_url}`))
        .catch(err => alert(`${JSON.stringify(err.response.data.detail)}`))  
      }
      function handleInputChange(event) {
        setContenturl(event.target.value)
      }
    return (
        <div>
            <span> Create content</span>
            <form onSubmit={handleSubmit}>
                <label>
                    Content link:
                </label><br/>
                <input type="text" name="content_url" onChange={handleInputChange} value={content_url}/><br/>
                <button type="submit">Create content</button>   
            </form>
        </div>
    )
}




export default CreateContent