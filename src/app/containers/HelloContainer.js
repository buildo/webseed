import React from 'react';
import { props, t, skinnable } from 'revenge';
import { Button } from 'Basic';
import Hello from 'Hello/Hello';
import { User } from 'domain';
import declareCommands from 'declareCommands';
import declareQueries from 'declareQueries';
import declareConnect from 'declareConnect';

const commands = declareCommands(['doLogout']);
const queries = declareQueries(['user']);
const connect = declareConnect({
  user: t.maybe(User)
});

@commands
@queries
@connect
@skinnable()
@props({
  ...commands.Type,
  ...queries.Type,
  ...connect.Type
})
export default class HelloContainer extends React.Component {

  doLogout = () => this.props.doLogout().then(() => this.props.transition({
    view: 'login',
    token: null
  }));

  getLocals() {
    const {
      doLogout,
      props: {
        user: { name: username } = {}
      }
    } = this;

    return { username, doLogout };
  }

  template({ username, doLogout }) {
    return (
      <div>
        {username && <Hello username={username} />}
        <Button onClick={doLogout}>logout</Button>
      </div>
    );
  }

}
