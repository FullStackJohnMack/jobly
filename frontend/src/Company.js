import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from "./JoblyApi";
import CardList from './CardList';
import LoggedInContext from './LoggedInContext';

function Company() {
    const { param } = useParams();
    const [company,setCompany] = useState(null);
    const { user } = useContext(LoggedInContext);


    useEffect(()=> {
        if (user) {
            async function getCompany() {
                const company = await JoblyApi.getCompany(param,user.username);
                setCompany(company);
            }
            getCompany();
        }
    },[user])


    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div className="company">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <p>Number of employees: {company.num_employees}</p>
            <CardList user={user} cards={company.jobs}/>
        </div>
    )
}

export default Company