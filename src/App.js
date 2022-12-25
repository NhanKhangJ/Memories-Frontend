import React  from 'react';

import {Container } from '@material-ui/core';

//allow us to dispatach an action
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';



import Navbar from './components/Navbar/Navbar';



import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
//Typography stand for any textual element h2 paragraph give us a nice looking font
//Gridd item xs {12} sm {7}, grid have 12 space total, xs: extra small devices sm: small and medium


const App = () =>{
  const user = JSON.parse(localStorage.getItem('profile'))


  return(
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Switch>
        <Route path='/' exact component={() => <Redirect to="/posts" />} />
        <Route path="/posts" exact component={Home}/>
        <Route path="/posts/search" exact component={Home}/>
        <Route path="/posts/:id" component={PostDetails}/>
        <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
      </Switch>
    </Container>
    </BrowserRouter>
  
  )
}

export default App;
