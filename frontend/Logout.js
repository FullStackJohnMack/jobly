import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import LoggedInContext from './LoggedInContext';


function Logout() {
    
    const { loggedIn, showLoggedIn, setUser } = useContext(LoggedInContext);
    const history = useHistory();

    localStorage.removeItem('_token');
    showLoggedIn(false);
    history.push('/');
    setUser(null);

    return (
        <Redirect to="/"/>
    )
}

export default Logout