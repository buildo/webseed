import t from 'tcomb';
import container from 'container';
import Hello from './Hello';

export default container(Hello, {
  connect: ['formal'],
  queries: ['user'],
  commands: ['doRefreshUser'],
  local: {
    foo: t.maybe(t.String)
  },
  mapProps: ({ transition, formal = false, user, doRefreshUser }) => ({
    toggle: () => {
      transition({ formal: !formal, foo: 'localTest' });
    },
    formal,
    user,
    onRefreshClick: () => doRefreshUser()
  })
});
