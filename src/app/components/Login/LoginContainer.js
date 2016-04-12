import t from 'tcomb';
import { fillFlexLoading, containerFactory } from 'Basic';
import Login from './Login';

const LoginContainer = containerFactory(Login, {
  loadingDecorator: fillFlexLoading,
  commands: ['doLogin'],
  connect: {
    token: t.maybe(t.String),
    view: t.String
  }
});

export default LoginContainer(({ token, view, doLogin, transition }) => ({
  token,
  view,
  doLogin,
  transition,
  redirectView: 'main'
}));
