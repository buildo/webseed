import React from 'react';
import { pure } from 'revenge';

import './hello.scss';

@pure
export default class Hello extends React.Component {

  render() {
    return (
      <div className='hello'>
        <h1>Hello</h1>
      </div>
    );
  }

}
