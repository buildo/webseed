import React from 'react';
import { pure, props, t, skinnable } from 'revenge';
import { FlexView } from 'Basic';
import Login from 'Login/Login';
import declareCommands from 'declareCommands';
import declareConnect from 'declareConnect';

const redirectView = 'main';

const commands = declareCommands(['doLogin']);
const connect = declareConnect({
  token: t.maybe(t.String),
  view: t.String
}, { pure: false });

@commands
@connect
@pure
@skinnable()
@props({
  ...commands.Type,
  ...connect.Type
})
export default class LoginContainer extends React.Component {

  shouldRedirect({ token, view }) {
    return token && view === 'login';
  }

  maybeRedirect(props) {
    if (this.shouldRedirect(props)) {
      this.props.transition({
        view: redirectView
      });
    }
  }

  componentWillMount() {
    this.maybeRedirect(this.props);
  }

  componentWillReceiveProps(props) {
    this.maybeRedirect(props);
  }

  doLogin = ({ username, password }) => {
    return this.props.doLogin({ username, password });
  };

  getLocals() {
    const { doLogin } = this;

    return { doLogin };
  }

  template({ doLogin }) {
    return (
      <FlexView
        height='100%'
        width='100%'
        hAlignContent='center'
        vAlignContent='center'
        style={{ position: 'relative' }}
      >
        <Login doLogin={doLogin} />
      </FlexView>
    );
  }

}
