import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import LoggedInContext from './LoggedInContext';
import { Form, Button } from 'react-bootstrap';

function Login() {

    const history = useHistory();

    //this piece of state captures form data
    const [formData, setFormData] = useState({
        username: "",
        password: ""
        });
    
    const {loggedIn, showLoggedIn} = useContext(LoggedInContext);
    
    async function login() {
        const token = await JoblyApi.login(formData);
        localStorage.setItem('_token',token);
        showLoggedIn(true);
        history.push('/');
    }
    
    
    //processes real-time changes to form data
    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    function handleSubmit (e) {
        e.preventDefault();
        login();
        e.target.username.value = "";
        e.target.password.value = "";
    }

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group><Form.Control onChange={handleChange} type="text" name="username" placeholder="Username"/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="password" name="password" placeholder="Password"/></Form.Group>
                <Button type="submit" name="button">Submit</Button>
            </Form>
        </div>
    )
}

export default Login