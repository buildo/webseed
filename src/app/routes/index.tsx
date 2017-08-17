import * as React from 'react';
import { Route, DefaultRoute } from 'react-router';
import App from 'AppHandler';
import Hello from 'HelloHandler';

export default (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='hello' handler={Hello} />
  </Route>
);
