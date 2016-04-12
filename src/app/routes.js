import React from 'react';
import { Route } from 'react-router';
import App from 'AppHandler';
import Hello from 'HelloHandler';
import Login from 'LoginHandler';
import Auth from 'AuthHandler';

export default (
  <Route name='main' path='/' handler={App}>
    <Route name='login' handler={Login} />
    <Route handler={Auth}>
      <Route component={Hello} handler={Hello} />
    </Route>
  </Route>
);
