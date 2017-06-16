import * as React from 'react';
import { intlMethods } from 'Basic';
import _loading from 'react-avenger/lib/loading';
import { LoadingSpinner, Panel } from 'Basic';

import './hello.scss';

type Props = {
  formal?: boolean,
  toggle: React.MouseEventHandler<HTMLAnchorElement>,
  user: string,
  onRefreshClick: () => Promise<void>
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
class Hello extends React.PureComponent<Props> {

  formatMessage: (k: string) => string; // TODO: typo

  render() {
    const { formal, toggle, user, onRefreshClick } = this.props;
    const greeting = formal ? formalGreeting() : 'Hello';

    return (
      <Panel className='hello'>
        <div>
          <h1>
            <a onClick={toggle}>{greeting}</a> {user}
          </h1>
          <a onClick={onRefreshClick}>(refresh)</a>
        </div>
      </Panel>
    );
  }

}

const loading = _loading({
  wrapper: <div style={{ textAlign: 'center', position: 'relative', minHeight: 100 }} />,
  loader: <LoadingSpinner />
});

export default loading(Hello);
