import t from 'tcomb';
import container from 'container';
import Hello from './Hello';

export default container(Hello, {
  connect: { formal: t.maybe(t.Boolean) },
  queries: ['user'],
  mapProps: ({ transition, formal = false, user }) => ({
    toggle: () => {
      transition({ formal: !formal });
    },
    formal,
    user
  })
});
