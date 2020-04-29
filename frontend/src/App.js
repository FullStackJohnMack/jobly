import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './NavBar';
import LoggedInContext from './LoggedInContext';
import JwtDecode from 'jwt-decode';
import JoblyApi from "./JoblyApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {

  const [loggedIn,setLoggedIn] = useState(false);
  const [user,setUser] = useState(null);

  const showLoggedIn = (bool) => {
    setLoggedIn(bool);
  }

  useEffect(()=> {
    if (localStorage.getItem('_token')) {
      const token = localStorage.getItem('_token');
      const username = JwtDecode(token).username;
      async function getUser() {
          const user = await JoblyApi.getUser(username);
          setUser(user);
      }
      getUser();  
    }
  },[loggedIn])

  return (
    <Container className="App">
      
      <BrowserRouter>
      <LoggedInContext.Provider value={{loggedIn, user, setUser, showLoggedIn}}>
        <NavBar user={user}/>
        <Routes user={user}/>
      </LoggedInContext.Provider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
