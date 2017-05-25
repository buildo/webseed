import * as React from 'react';
import { intlMethods } from 'Basic';
import { TransitionFunction, connect as _connect } from 'state';

import './hello.scss';

const connect = _connect(['formal']);

type Props = {
  transition: TransitionFunction,
  formal?: boolean
};

@intlMethods
class Hello extends React.PureComponent<Props> {

  formatMessage: (k: string) => string; // TODO: typo

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

export default connect(Hello);
