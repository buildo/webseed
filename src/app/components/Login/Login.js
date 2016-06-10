import React from 'react';
import { pure, skinnable } from 'revenge';
import { props, t } from 'tcomb-react';
import { FlexView, Button, Icon, intlMethods } from 'Basic';
import cx from 'classnames';
import config from '../../../../config';

import './login.scss';

const __DEV = process.env.NODE_ENV === 'development';

@pure
@intlMethods
@skinnable()
@props({
  doLogin: t.Function,
  redirectView: t.String,
  token: t.maybe(t.String),
  view: t.String,
  transition: t.Function
})
export default class Login extends React.Component {

  shouldRedirect({ token, view }) {
    return token && view === 'login';
  }

  maybeRedirect(props) {
    if (this.shouldRedirect(props)) {
      this.props.transition({
        view: this.props.redirectView
      });
    }
  }

  componentWillMount() {
    this.maybeRedirect(this.props);
  }

  componentWillReceiveProps(props) {
    this.maybeRedirect(props);
  }

  doLogin = ({ username, password }) => {
    return this.props.doLogin({ username, password }).then(({ token }) => this.props.transition({
      view: this.props.redirectView,
      token
    }));
  };

  constructor(props) {
    super(props);
    this.state = {
      username: __DEV ? config.username || 'luca' : '',
      password: __DEV ? config.password || 'luca' : '',
      buttonState: 'ready',
      showPassword: false
    };
  }

  submitLogin = () => {
    const { username, password } = this.state;
    this.setState({ buttonState: 'processing' });
    return this.doLogin({ username, password }).then(this.onSuccess, this.onFailure);
  };

  onSuccess = () => this.setState({ buttonState: 'success' });

  onFailure = () => this.setState(
    { buttonState: 'error' }, () => setTimeout(() => this.setState({ buttonState: 'ready' }), 2000)
  );

  onKeyPress = ({ which, keyCode }) => (which === 13 || keyCode === 13) && this.onEnterKeyPress();

  onEnterKeyPress = () => this.submitLogin();

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  componentDidMount() {
    window.addEventListener('keypress', this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.onKeyPress);
  }

  getLocals() {
    const {
      submitLogin,
      toggleShowPassword,
      state: { username, password, showPassword }
    } = this;

    const buttonState = (username && password) ?
      this.state.buttonState : 'not-allowed';

    return {
      submitLogin, buttonState,
      username, password,
      showPassword, toggleShowPassword
    };
  }

  template({ submitLogin, buttonState, username, password, showPassword, toggleShowPassword }) {
    return (
      <FlexView
        column
        vAlignContent='center'
        hAlignContent='center'
        className='login'
      >

        <FlexView column
          vAlignContent='center'
          hAlignContent='center'
          className='login-form-wrapper'
        >

          <FlexView column className='login-form-input-wrapper login-form-username'>
            <label className='label'>{this.formatMessage('Login.username')}</label>
            <input
              className='input-text'
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </FlexView>

          <FlexView column className='login-form-input-wrapper login-form-password'>
            <label className='label'>{this.formatMessage('Login.password')}</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className='input-text'
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Icon
              className={cx('show-password-button', { colored: !showPassword })}
              icon={showPassword ? 'eye-slash' : 'eye'}
              onClick={toggleShowPassword}
            />
          </FlexView>

          <FlexView className='login-form-input-wrapper login-form-button-wrapper'>
            <Button primary
              size='medium'
              buttonState={buttonState}
              label={{
                ready: this.formatMessage('Login.login'),
                'not-allowed': this.formatMessage('Login.login'),
                error: this.formatMessage('Login.error'),
                processing: this.formatMessage('Login.processing')
              }}
              className='login-form-button'
              onClick={submitLogin}
            />
          </FlexView>

        </FlexView>

      </FlexView>
    );
  }

}
