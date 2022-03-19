import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LogoutUser() {
    function logOut(){
        localStorage.removeItem("token")
        //gotto redirect user to main
    }
    return (
        <div>
            <button onClick={logOut}>Log out</button>
        </div>
    )

}

export default LogoutUser