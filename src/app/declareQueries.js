import getQueries from 'queries';
import API from 'HTTPAPI';
import queries from 'react-avenger/queries';

export { QueriesContextTypes } from 'react-avenger/queries';
export default queries(getQueries(API));