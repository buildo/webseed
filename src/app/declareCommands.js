import getCommands from 'commands';
import getQueries from 'queries';
import API from 'HTTPAPI';
import commands from 'react-avenger/commands';

export { CommandsContextTypes } from 'react-avenger/commands';
export default commands(getCommands(API, getQueries(API)));
