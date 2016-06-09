import React from 'react';
import { props, t } from 'tcomb-react';
import { pure, skinnable } from 'revenge';

import './hello.scss';

@pure
@skinnable()
@props({
  formal: t.Boolean,
  toggle: t.Function
})
export default class Hello extends React.Component {

  formalGreeting() {
    const hours = new Date().getHours();
    if (hours > 20) return 'Good Night';
    else if (hours > 13) return 'Good Afternoon';
    else return 'Good Morning';
  }

  getLocals() {
    const { toggle } = this.props;
    const greeting = this.props.formal ? this.formalGreeting() : 'Hello';

    return { toggle, greeting };
  }

  template({ toggle, greeting }) {
    return (
      <div className='hello'>
        <h1>
          <a onClick={toggle}>{greeting}</a>
        </h1>
      </div>
    );
  }

}
