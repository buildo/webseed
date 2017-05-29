import React from 'react';
import { intlMethods } from 'Basic';
import { props, t } from 'tcomb-react';
import { skinnable } from 'revenge';
import loading from 'react-avenger/lib/loading';
import { LoadingSpinner, Panel } from 'Basic';
import FlexView from 'react-flexview';

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
@loading({
  wrapper: <div style={{ textAlign: 'center', position: 'relative', minHeight: 100 }} />,
  loader: <LoadingSpinner />
})
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
    );
  }

}
