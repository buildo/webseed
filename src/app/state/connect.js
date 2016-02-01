import React from 'react';
import omit from 'lodash/omit';
import identity from 'lodash/identity';

export const ConnectContextTypes = {
  transition: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired
};

export default function connect(select = identity) {
  return Component => class ConnectWrapper extends React.Component {
    static contextTypes = ConnectContextTypes;

    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this._subscription = this.context.state.subscribe(v => {
        this.setState(v); // eslint-disable-line react/no-did-mount-set-state
      });
    }

    componentWillUnmount() {
      this._subscription.unsubscribe();
    }

    render() {
      const props = {
        ...omit(this.props, ['params', 'query', 'router', 'app']), // kill RR props on handlers
        ...select(this.state),
        transition: this.context.transition
      };
      return (
        <Component {...props}/>
      );
    }
  };
}
