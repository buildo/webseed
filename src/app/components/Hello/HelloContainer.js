import t from 'tcomb';
import container from 'container';
import Hello from './Hello';

export default container(Hello, {
  connect: { formal: t.maybe(t.Boolean) },
  mapProps: ({ transition, formal = false }) => ({
    toggle: () => {
      transition({ formal: !formal });
    },
    formal
  })
});
