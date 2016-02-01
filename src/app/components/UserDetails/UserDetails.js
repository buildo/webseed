import React from 'react';
import { t, props, skinnable } from 'revenge';
import queries from 'state/queries';
import connect from 'state/connect';
import { FlexView } from 'Basic';

import './userDetails.scss';

/**
 *  Example of non-handler (non top level) component
 *  using @queries. This query is dynamically added
 *  to the avenger state.
 *
 *  @connect provides a transition function, used
 *  to transition the app to a new state.
 *  transition takes either a new state patch, or a
 *  function takeing the curren state and returning a
 *  state path
 */
@queries(['user'])
@connect(() => {})
@skinnable()
@props({
  user: t.maybe(t.Obj),
  readyState: t.Obj,
  transition: t.Function
})
export default class UserDetails extends React.Component {

  getLocals() {
    const {
      makeTransition,
      props: { user }
    } = this;

    return {
      user,
      makeTransition
    };
  }

  makeTransition = () => {
    const username = this.props.user.name.first;
    this.props.transition({ username });
  };

  template({ user, makeTransition }) {
    return (
      <FlexView className='user-details'>
        {user && <h3>
          {user.name.title}&nbsp;
          <span className='link' onClick={makeTransition}>{user.name.first}</span>&nbsp;
          {user.name.last}
        </h3>}
      </FlexView>
    );
  }

}
