import React from 'react';
import { props, t } from 'tcomb-react';
import { pure } from 'revenge';

import './hello.scss';

@pure
@props({
  formal: t.Boolean,
  toggle: t.Function
})
export default class Hello extends React.Component {

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
