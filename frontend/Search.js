import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Search( {setSearchTerm} ) {

        //this piece of state captures form data
        const [formData, setFormData] = useState({
            searchTerm: ""
          });
        
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
        setSearchTerm(formData.searchTerm);
        e.target.searchTerm.value = "";
    }

    return ( 
        <Form onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Control name="searchTerm" type="text" placeholder="Enter search term..." onChange={handleChange}/>
            </Form.Group>

            <Button type="submit">Search</Button>
        </Form>
    )
}

export default Search