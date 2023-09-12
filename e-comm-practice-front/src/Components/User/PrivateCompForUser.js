import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

function PrivateCompForUser() {
    const auth= localStorage.getItem('usersUser');
    return auth?<Outlet/>:<Navigate to='/login' />
}

export default PrivateCompForUser;
