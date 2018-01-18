export { cacheQueryValues } from 'buildo-react-container';
import declareQueries from './declareQueries';
export { declareQueries };
export { QueriesContextTypes } from './declareQueries';
import declareCommands from './declareCommands';
export { declareCommands };
export { CommandsContextTypes } from './declareCommands';

import makeSwitchView from '../components/SwitchView';
import { View } from 'model';
export const SwitchView = makeSwitchView<View>('view');