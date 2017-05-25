import t from 'tcomb';
import container from 'container';
import Hello from './Hello';

export default container(Hello, {
  connect: { formal: t.maybe(t.Boolean) },
  queries: ['user'],
  commands: ['doRefreshUser'],
  mapProps: ({ transition, formal = false, user, doRefreshUser }) => ({
    toggle: () => {
      transition({ formal: !formal });
    },
    formal,
    user,
    onRefreshClick: () => doRefreshUser()
  })
});
