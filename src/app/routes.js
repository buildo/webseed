import React from 'react';
import { Route } from 'react-router';
import App from 'AppHandler';
import Hello from 'HelloHandler';

export default (
  <Route name='main' path='/' handler={App}>
    <Route component={Hello} handler={Hello} />
  </Route>
);
