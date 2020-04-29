import React, { useState, useEffect } from 'react';
import JoblyApi from "./JoblyApi";
import CardList from './CardList';
import Search from './Search';

function Jobs( { user } ) {
    const [jobs,setJobs] = useState([]);
    const [searchTerm,setSearchTerm] = useState(null);

    useEffect(()=> {
        async function getJobs() {
            const jobs = await JoblyApi.getAllJobs(searchTerm);
            setJobs(jobs);
        }
        getJobs();
    },[searchTerm])

    // if (!jobs) {
    //     return <div>.</div>;
    // }

    return (
        <div className="job">
            <h1>Jobs</h1>
            <Search setSearchTerm={setSearchTerm}/>
            <CardList cards={jobs} user={user}/>
        </div>
    )
}

export default Jobs