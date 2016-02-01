import React from 'react';
import { Route } from 'react-router';
import App from 'AppContainer';
import Hello from 'HelloContainer';

export default (
  <Route path='/' component={App}>
    <Route path=':username' component={Hello} />
  </Route>
);
