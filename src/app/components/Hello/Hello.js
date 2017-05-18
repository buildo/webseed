import React from 'react';
import { intlMethods } from 'Basic';
import { pure } from 'revenge';

import './hello.scss';

@pure
@intlMethods
export default class Hello extends React.Component {

  render() {
    return (
      <div className='hello'>
        <h1>{this.formatMessage('Hello.hello')}</h1>
      </div>
    );
  }

}
