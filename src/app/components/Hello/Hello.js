import React from 'react';
import { intlMethods } from 'Basic';
import { props, t } from 'tcomb-react';
import { skinnable } from 'revenge';

import './hello.scss';

function formalGreeting() {
  const hours = new Date().getHours();
  if (hours > 20) {
    return 'Good Night';
  } else if (hours > 13) {
    return 'Good Afternoon';
  } else {
    return 'Good Morning';
  }
}

@intlMethods
@skinnable()
@props({
  formal: t.Boolean,
  toggle: t.Function
})
export default class Hello extends React.PureComponent {

  getLocals({ formal, toggle }) {
    const greeting = formal ? formalGreeting() : 'Hello';

    return { greeting, toggle };
  }

  template({ greeting, toggle }) {
    return (
      <div className='hello'>
        <h1>
          <a onClick={toggle}>{greeting}</a>
        </h1>
      </div>
    );
  }

}
