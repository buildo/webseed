import React from 'react';
import { skinnable, props, t, pure } from 'revenge';
import LoadingSpinnerBuildo from 'buildo-react-components/src/loading-spinner';

import 'buildo-react-components/src/loading-spinner/style.scss';

const theme = t.enums.of(['light', 'dark']);

export const loadingSpinnerProps = {
  message: t.maybe(t.Str),
  theme: t.maybe(theme),
  size: t.maybe(t.union([t.Str, t.Num])),
  color: t.maybe(t.Str),
  delay: t.maybe(t.Num),
  overlayColor: t.maybe(t.Str)
};

export const loadingSpinnerDefaultProps = {
  message: '',
  delay: 200,
  theme: 'light'
};

@pure
@skinnable()
@props(loadingSpinnerProps)
export default class LoadingSpinner extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  static defaultProps = loadingSpinnerDefaultProps;

  setVisible = () => {
    this.setState({ visible: true });
  };

  componentDidMount() {
    this.timeout = setTimeout(this.setVisible, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getLocals() {
    const {
      color: _color,
      overlayColor: _overlayColor,
      theme,
      message: _message,
      size
    } = this.props;
    const { visible } = this.state;
    const color = visible ? _color : 'transparent';
    const overlayColor = _overlayColor ||
      (theme === 'light') ? 'rgba(255,255,255,.5)' : 'rgba(128,128,128,.5)';
    const message = {
      content: _message,
      color: _message && color
    };
    return {
      color,
      overlayColor,
      message,
      size
    };
  }

  template(locals) {
    return (
      <LoadingSpinnerBuildo {...locals} />
    );
  }
}
