import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from './JoblyApi';
import CardList from './CardList';
import Search from './Search';
import LoggedInContext from './LoggedInContext';
import { Container } from 'react-bootstrap';

function Companies() {

    const [companies,setCompanies] = useState([]);
    const [searchTerm,setSearchTerm] = useState(null);
    const {user} = useContext(LoggedInContext);

    useEffect(()=>{
        async function getAllCompanies() {
            const companies = await JoblyApi.getAllCompanies(searchTerm);
            setCompanies(companies);
        }
        getAllCompanies();
    },[searchTerm])
    
    

    return (
        <>
            <h1>Companies</h1>
            <Search setSearchTerm={setSearchTerm}/>
            <CardList cards={companies} user={user}/>
        </>
    )
}

export default Companies