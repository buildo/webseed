import { fillFlexLoading, containerFactory } from 'Basic';
import Logout from './Logout';

const LogoutContainer = containerFactory(Logout, {
  loadingDecorator: fillFlexLoading,
  connect: {},
  commands: ['doLogout']
});

export default LogoutContainer(({ doLogout, transition }) => ({
  doLogout: () => doLogout().then(() => transition({ view: 'login', token: null }))
}));
