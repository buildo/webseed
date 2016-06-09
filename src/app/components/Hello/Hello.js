import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';

import './hello.scss';

@pure
@skinnable()
@props({
  formal: t.Boolean,
  toggle: t.Function,
  user: t.String,
  onRefreshClick: t.Function
})
export default class Hello extends React.Component {

  formalGreeting() {
    const hours = new Date().getHours();
    if (hours > 20) return 'Good Night';
    else if (hours > 13) return 'Good Afternoon';
    else return 'Good Morning';
  }

  getLocals() {
    const { toggle, user, onRefreshClick } = this.props;
    const greeting = this.props.formal ? this.formalGreeting() : 'Hello';

    return { toggle, greeting, user, onRefreshClick };
  }

  template({ toggle, greeting, user, onRefreshClick }) {
    return (
      <div className='hello'>
        <h1>
          <a onClick={toggle}>{greeting}</a> {user}
        </h1>
        <a onClick={onRefreshClick}>(refresh)</a>
      </div>
    );
  }

}
