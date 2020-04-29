import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import JoblyApi from "./JoblyApi";
import LoggedInContext from './LoggedInContext';
import BootstrapCard from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

function Card( {info} ) {
    const [applied,setApplied] = useState(info.state);
    const { user } = useContext(LoggedInContext);

    async function apply() {
        const resp = await JoblyApi.apply(user.username, info.id);
        setApplied(true);
    }

    const handleClick = () => {
        apply();
    }

    if (info.handle) {
        return (
            <NavLink to={`companies/${info.handle}`} className="no-decoration">
                <BootstrapCard className="bootstrap-card">
                    <BootstrapCard.Title>{info.name}</BootstrapCard.Title>
                    <BootstrapCard.Text>{info.description}</BootstrapCard.Text>
                </BootstrapCard>
            </NavLink>
        )
    } else {
        return (
            <BootstrapCard className="bootstrap-card">
                <BootstrapCard.Title>{info.title}</BootstrapCard.Title>
                <BootstrapCard.Text>{info.company_handle}</BootstrapCard.Text>
                <BootstrapCard.Text>{info.salary}</BootstrapCard.Text>
                {applied ? <Button variant="outline-primary">Applied</Button> : <Button  onClick={handleClick}>Apply</Button>}
            </BootstrapCard>
        )
    }


}

export default Card