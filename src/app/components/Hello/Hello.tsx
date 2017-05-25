import * as React from 'react';
import { intlMethods } from 'Basic';

import './hello.scss';

type Props = {
  formal?: boolean,
  toggle: React.MouseEventHandler<HTMLAnchorElement>,
  user: string
};

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
export default class Hello extends React.PureComponent<Props> {

  formatMessage: (k: string) => string; // TODO: typo

  render() {
    const { formal, toggle, user } = this.props;
    const greeting = formal ? formalGreeting() : 'Hello';

    return (
      <div className='hello'>
        <h1>
          <a onClick={toggle}>{greeting}</a> {user}
        </h1>
      </div>
    );
  }

}
