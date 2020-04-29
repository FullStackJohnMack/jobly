import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import LoggedInContext from './LoggedInContext';
import { Nav } from 'react-bootstrap';

function NavBar() {

    const {loggedIn, showLoggedIn} = useContext(LoggedInContext);
    const {user} = useContext(LoggedInContext);

    if (localStorage.getItem('_token')) {
        showLoggedIn(true);
    }

    return (
        <Nav className="navbar justify-content-end">
            
            <NavLink exact to="/" className='nav-link'>Home</NavLink>
            {loggedIn === true ? <NavLink exact to="/companies" className='nav-link'>Companies</NavLink> : null}
            {loggedIn === true ? <NavLink exact to="/jobs" className='nav-link'>Jobs</NavLink> : null}
            {loggedIn === true ? <NavLink exact to="/profile" className='nav-link'>Profile</NavLink> : null}
            {loggedIn === true ? null : <NavLink exact to="/register" className='nav-link'>Register</NavLink>}
            {loggedIn === true ? <NavLink exact to="/logout" className='nav-link'>Logout</NavLink> : <NavLink exact to="/login">Login</NavLink>}
            {user ? <span className="nav-username">Welcome, {user.first_name}!</span> : null}
            
        </Nav>
    )
}

export default NavBar