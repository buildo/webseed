import React from 'react';
import { props, t, skinnable } from 'revenge';
import Hello from 'Hello/Hello';
import { User } from 'domain';
import declareQueries from 'declareQueries';
import declareConnect from 'declareConnect';

const queries = declareQueries(['user']);
const connect = declareConnect({
  user: t.maybe(User)
});

@queries
@connect
@skinnable()
@props({
  ...queries.Type,
  ...connect.Type
})
export default class HelloContainer extends React.Component {

  getLocals() {
    const username = this.props.user ? this.props.user.name : null;

    return { username };
  }

  template({ username }) {
    return (
      <div>
        {username && <Hello username={username} />}
      </div>
    );
  }

}
