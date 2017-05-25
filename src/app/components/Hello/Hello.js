import React from 'react';
import { intlMethods } from 'Basic';
import { props, t } from 'tcomb-react';
import skinnable from 'react-skinnable';
import { noLoaderLoading } from 'react-avenger/lib/loading';

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
@noLoaderLoading
@skinnable()
@props({
  formal: t.Boolean,
  toggle: t.Function,
  user: t.String,
  onRefreshClick: t.Function
})
export default class Hello extends React.PureComponent {

  getLocals({ formal, toggle, user, onRefreshClick }) {
    const greeting = formal ? formalGreeting() : 'Hello';

    return { greeting, toggle, user, onRefreshClick };
  }

  template({ greeting, toggle, user, onRefreshClick }) {
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
