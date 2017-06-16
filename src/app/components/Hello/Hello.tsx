import * as React from 'react';
import { intlMethods } from 'Basic';
import './hello.scss';

type Props = {
  formal?: boolean,
  toggle: React.MouseEventHandler<HTMLAnchorElement>
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
    const { formal, toggle } = this.props;
    const greeting = formal ? formalGreeting() : 'Hello';

    return (
      <div className='hello'>
        <h1>
          <a onClick={toggle}>{greeting}</a>
        </h1>
      </div>
    );
  }

}
