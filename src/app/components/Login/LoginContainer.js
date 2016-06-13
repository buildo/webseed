import t from 'tcomb';
import Login from './Login';
import container from 'react-container';
import allCommands from 'commands';

export default container({ allCommands })(Login, {
  connect: { token: t.maybe(t.String) },
  mapProps: ({ transition }) => ({
    onLoginClick: () => {
      transition({ view: 'hello' });
    }
  })
});
