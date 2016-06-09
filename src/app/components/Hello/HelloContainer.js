import Hello from './Hello';
import t from 'tcomb';
import container from 'react-container';

const HelloContainer = container(Hello, {
  connect: { formal: t.maybe(t.Boolean) },
  mapProps: ({ transition, formal = false }) => ({
    toggle: () => {
      transition({ formal: !formal });
    },
    formal
  })
});

export default HelloContainer;
