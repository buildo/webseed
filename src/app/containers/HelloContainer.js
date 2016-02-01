import React from 'react';
import { props, t, skinnable } from 'revenge';
import connect from 'state/connect';
import Hello from 'Hello/Hello';
import UserDetails from 'UserDetails/UserDetails';
import { FlexView } from 'Basic';
import pick from 'lodash/pick';

const intlProps = {
  messages: t.Any,
  locales: t.list(t.Str),
  formats: t.Any
};

/**
 *  Example of component accessing the router params
 *  Router params are just part of the state, hence
 *  accessed via the @connect decorator.
 *
 */
@connect(s => pick(s, 'username'))
@skinnable()
@props({
  username: t.maybe(t.String),
  transition: t.Function,
  ...intlProps
})
export default class HelloContainer extends React.Component {

  getLocals() {
    const { username } = this.props;

    return { username };
  }

  template({ username }) {
    return (
      <FlexView hAlignContent='center'>
        {username && <Hello username={username} />}
        <UserDetails />
      </FlexView>
    );
  }

}
