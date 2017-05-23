import containerFactory from 'buildo-react-container/lib';
import allQueries from 'queries';
import * as allCommands from 'commands';

export { QueriesContextTypes } from 'react-avenger/lib/queries';
export { CommandsContextTypes } from 'react-avenger/lib/commands';
export { ConnectContextTypes } from 'buildo-state/lib/connect';

export default containerFactory({ allQueries, allCommands });
