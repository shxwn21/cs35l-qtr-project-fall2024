
import React from 'react';
import {Link} from 'react-router-dom'




function Back_toUser_Home_Page() {
    return (
        <Link to="pages/User_Home_page">
            <button> User Home Page </button>
        </Link>
    );
}


function User_Settings_and_Info() {
   
    return (
        <div>
            <h1> User Settings Page</h1>

            <Back_toUser_Home_Page />

        </div>
    );
}


export default User_Settings_and_Info;

