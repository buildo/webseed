import * as React from 'react';
import { intlMethods } from 'Basic';
import { LoadingSpinner, Panel } from 'Basic';
import FlexView from 'react-flexview';

import './hello.scss';

type Props = {
  formal?: boolean,
  toggle: React.MouseEventHandler<HTMLAnchorElement>,
  user: string,
  loading: boolean,
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
export default class Hello extends React.PureComponent<Props> {

  formatMessage: (k: string) => string; // TODO: typo

  render() {
    const { formal, toggle, user, onRefreshClick, loading } = this.props;
    const greeting = formal ? formalGreeting() : 'Hello';

    return (
      <div style={{ textAlign: 'center', position: 'relative', minHeight: 100 }}>
        <FlexView className='hello'>
          <FlexView basis='150' shrink vAlignContent='center' className='side-view'>
            <h2>I'm the left view!</h2>
          </FlexView>
          <FlexView className='hello-view' grow>
            <Panel>
              <FlexView column hAlignContent='center'>
                <h1>
                  <a onClick={toggle}>{greeting}</a> {user}
                </h1>
                <a onClick={onRefreshClick}>(refresh)</a>
              </FlexView>
            </Panel>
          </FlexView>
          <FlexView basis='150' shrink vAlignContent='center' className='side-view'>
            <h2>I'm the right view!</h2>
          </FlexView>
        </FlexView>
        {loading && <LoadingSpinner />}
      </div>
    );
  }

}
