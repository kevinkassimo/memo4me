import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Home from '../ui/scenes/home/Home.jsx';
import Dashboard from '../ui/scenes/dashboard/Dashboard.jsx';
import Login from '../ui/scenes/login/Login.jsx';
import Userpage from '../ui/scenes/userpage/Userpage.jsx';

export const renderRoutes = () => (
  <BrowserRouter>
    <div>
      <Route exact
             path="/"
             component={(props) => Meteor.user() ? (<Redirect to="/dashboard" />) : (<Home {...props} />)} />
      <Route path="/dashboard"
             component={(props) => Meteor.user() ? (<Dashboard {...props} />) : (<Redirect to="/login" />)} />
      <Route path="/login"
             component={(props) => Meteor.user() ? (<Dashboard {...props} />) : (<Login {...props} />)}/>
      <Route path="/user/:customUrl" component={(props) => <Userpage {...props} /> } />
    </div>
  </BrowserRouter>
);