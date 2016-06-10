import Hello from './Hello';
import t from 'tcomb';
import containerFactory from 'react-container';
import allQueries from 'queries';

const container = containerFactory({ allQueries });

const HelloContainer = container(Hello, {
  connect: { formal: t.maybe(t.Boolean) },
  queries: ['user'],
  mapProps: ({ transition, formal = false, user }) => ({
    toggle: () => {
      transition({ formal: !formal });
    },
    formal,
    user: user || '...'
  })
});

export default HelloContainer;
