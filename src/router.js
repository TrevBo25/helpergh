import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from './Login';
import Home from './Home';

export default (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/home' component={Home} />
  </Switch>
)