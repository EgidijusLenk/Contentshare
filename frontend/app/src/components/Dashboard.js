import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateContent from './CreateContent';
import { AuthContext } from "../App";
function Dashboard() {
    const { state: authState } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);
    const [items, setItems] = useState([])
    const [user, setUser] = useState([])
    const domain = window.location.hostname
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
    
    function logOut(){
        dispatch({
            type: "LOGOUT",
        })
    }
    function copyToClipboard(e) {
        console.log(`${domain}/${e}`);
        navigator.clipboard.writeText(`https://${domain}/g/${e}`);
    }
    function editItem(e) {
        return
    }
    return (
        <div>
            <div className="container-sm">
            {/* <div className="row"> */}
            
            <br/>
            {user.length >= 0 && <button onClick={showContent}>Show content</button> }
            <br/>
            
            <div className='row'>    
            <div className="col-auto">
            <div className="col-auto">

              Hello {user.user},
            
              </div>

            {authState.isAuthenticated && 
             <button type="button" className="btn-sm btn-primary" onClick={logOut}>Logout</button>}
             </div>
            </div>
            

            <div className="col col-lg-10">

      <CreateContent updateTable={showContent}/>
            <ul className="list-group">
                
               {items.map((item, key) => {
                        return  <div className="list-group-item list-group-item-action">
                                    <div className="" key={key}> 
                                    <div className="row justify-content-between">
                                    <div className='col-auto '>{item.content_url}</div> 
                                    <div className='col-auto'>
                                    <span className="badge bg-secondary">{item.click_count} clicks</span> </div> 
                                    </div>
                                    <div className='row'>
                                    <div className='col-auto'>
                                    <div className="btn-group btn-group-sm" role="group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text" id="btnGroupAddon">ID {item.id}</div>
                                        </div>
                                        <button type="button" className="btn btn-outline-primary text-truncate"  onClick={ () => copyToClipboard(item.shortened_url)} data-bs-toggle="tooltip" data-bs-placement="left" title="Copy">{domain}/{item.shortened_url} </button>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => window.open(`https://${domain}/g/${item.shortened_url}`, '_blank').focus()}>Visit</button>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => editItem()}>Edit</button>
                                        </div>
                                        </div> 
                                        </div>
                                    </div> </div>
                                
                    }).reverse()}
               
            </ul>
            </div>
            {/* </div> */}
            </div>
        </div>

    )
}


export default Dashboard