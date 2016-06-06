import React from 'react';
import { props, t } from 'tcomb-react';
import { pure } from 'revenge';
import connect from 'state/connect';

import './hello.scss';

@pure
@connect({ formal: t.maybe(t.Boolean) })
@props({
  transition: t.Function,
  formal: t.maybe(t.Boolean)
})
export default class Hello extends React.Component {

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
