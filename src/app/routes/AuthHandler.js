import React from 'react';
import { RouteHandler } from 'react-router';
import { props, t } from 'revenge';
import declareConnect from 'declareConnect';

const connect = declareConnect({
  token: t.maybe(t.String),
  view: t.String
}, { pure: false });

@connect
@props({
  ...connect.Type
})
export default class AuthHandler extends React.Component {

  shouldRedirect({ token, view }) {
    return !token && view !== 'login';
  }

  maybeRedirect(props) {
    if (this.shouldRedirect(props)) {
      this.props.transition({
        view: 'login'
      });
    }
  }

  componentWillMount() {
    this.maybeRedirect(this.props);
  }

  componentWillReceiveProps(props) {
    this.maybeRedirect(props);
  }

  render() {
    return <RouteHandler />;
  }

}
