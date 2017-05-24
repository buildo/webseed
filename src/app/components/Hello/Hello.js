import React from 'react';
import { intlMethods } from 'Basic';

import './hello.scss';

@intlMethods
export default class Hello extends React.PureComponent {

  render() {
    return (
      <div className='hello'>
        <h1>{this.formatMessage('Hello.hello')}</h1>
      </div>
    );
  }

}
