import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInVzZXIiOiJlZ2lkaWp1cyJ9.m28fALXvx48M8gQtg4f1XRur2ifa30yFqdity61wAiE'
      }
      
    axios.get(`http://localhost:8000/users/me`, {headers: headers})
      .then(res => {
        console.log(res);
        console.log(res.data.contents);

        const persons = res.data.contents;
        
        this.setState({ persons });
      })
  }

  render() {
    return (
        <ul>
                {
                    this.state.persons.map((item, key) => {
                        return <li key={key}>{item.owner_id} {item.content_url}</li>
                    })
                }
            </ul>
    )
  }
}
