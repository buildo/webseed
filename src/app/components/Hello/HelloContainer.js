import Hello from './Hello';
import t from 'tcomb';
import containerFactory from 'react-container';
import allQueries from 'queries';
import allCommands from 'commands';

const container = containerFactory({ allQueries, allCommands });

const HelloContainer = container(Hello, {
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

export default HelloContainer;
