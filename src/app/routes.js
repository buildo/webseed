import React from 'react';
import { Route } from 'react-router';
import App from 'AppContainer';
import Hello from 'HelloContainer';
import Login from 'LoginContainer';
import Auth from 'AuthContainer';

export default (
  <Route name='main' path='/' handler={App}>
    <Route name='login' handler={Login} />
    <Route handler={Auth}>
      <Route component={Hello} handler={Hello} />
    </Route>
  </Route>
);
