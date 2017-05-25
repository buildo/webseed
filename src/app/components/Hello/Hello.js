import React from 'react';
import { intlMethods } from 'Basic';
import { props, t } from 'tcomb-react';
import connect from 'buildo-state/lib/connect';

import './hello.scss';

@intlMethods
@connect({ formal: t.maybe(t.Boolean) })
@props({
  transition: t.Function,
  formal: t.maybe(t.Boolean)
})
export default class Hello extends React.PureComponent {

  toggle = () => {
    this.props.transition({
      formal: !this.props.formal
    });
  }

  render() {
    return (
      <div className='hello'>
        <h1>
          <a onClick={this.toggle}>{this.props.formal ? 'Good Morning' : 'Hello'}</a>
        </h1>
      </div>
    );
  }

}
