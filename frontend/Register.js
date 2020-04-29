import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import LoggedInContext from './LoggedInContext';
import { Form, Button } from 'react-bootstrap';

function Register() {

    const history = useHistory();

    //this piece of state captures form data
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""
        });
    
    const {loggedIn, showLoggedIn} = useContext(LoggedInContext);
    
    async function register() {
        const token = await JoblyApi.register(formData);
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
        register();
        e.target.username.value = "";
        e.target.password.value = "";
        e.target.first_name.value = "";
        e.target.last_name.value = "";
        e.target.email.value = "";
    }

    return (
        <div>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group><Form.Control onChange={handleChange} type="text" name="username" placeholder="Username"/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="password" name="password" placeholder="Password"/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="text" name="first_name" placeholder="First Name"/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="text" name="last_name" placeholder="Last Name"/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="text" name="email" placeholder="Email Address"/></Form.Group>
                <Button type="submit" name="button">Submit</Button>
            </Form>
        </div>
    )
}

export default Register