import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import LoggedInContext from './LoggedInContext';
import { Form, Button } from 'react-bootstrap';

function Profile( {user} ) {
    const history = useHistory();

    const INITIAL_STATE = {
        first_name: "",
        last_name: "",
        email: "",
        photo_url: "",
        password: ""
    };

    //this piece of state captures form data
    const [formData, setFormData] = useState(INITIAL_STATE);
    
    useEffect(()=>{
        if (user) {
            setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            photo_url: (user.photo_url || '')
            })
        };
    },[user])

    const {loggedIn, showLoggedIn} = useContext(LoggedInContext);
    
    async function updateUser() {
        const resp = await JoblyApi.updateUser(user.username, formData);
        // localStorage.setItem('_token',token);
        // showLoggedIn(true);
        // history.push('/');
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
        e.target.password.value = '';
        updateUser();
    }

    if (!user) {
        return (
            <h1>Loading...</h1>
        )
    } else

    
    

    return (
        <div>
            <h1>Profile</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group><Form.Control onChange={handleChange} type="text" placeholder="First Name" name="first_name" value={`${formData.first_name}`}/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="text" placeholder="Last Name" name="last_name" value={`${formData.last_name}`}/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="text" placeholder="Email" name="email" value={`${formData.email}`}/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="text" placeholder="Photo URL" name="photo_url" value={`${formData.photo_url}`}/></Form.Group>
                <Form.Group><Form.Control onChange={handleChange} type="password" placeholder="Verify Password" name="password"/></Form.Group>
                <Button type="submit" name="button">Submit</Button>
            </Form>
        </div>
    )
}

export default Profile