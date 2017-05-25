import React from 'react';
import { intlMethods } from 'Basic';
import { props, t } from 'tcomb-react';

import './hello.scss';

@intlMethods
@props({
  formal: t.Boolean,
  toggle: t.Function
})
export default class Hello extends React.PureComponent {

  render() {
    return (
      <div className='hello'>
        <h1>
          <a onClick={this.props.toggle}>{this.props.formal ? 'Good Morning' : 'Hello'}</a>
        </h1>
      </div>
    );
  }

}
