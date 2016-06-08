import connect from 'state/connect';
import queries from 'react-avenger/queries';
import container from 'react-container';
import allQueries from 'queries';

const declareConnect = (decl = {}, config = {}) => (
  connect(decl, { killProps: ['params', 'query', 'router'], ...config })
);
const declareCommands = {};
const declareQueries = queries(allQueries);

export default container({ declareConnect, declareQueries, declareCommands });
