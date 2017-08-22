
import _containerFactory from 'buildo-react-container';
import * as t from 'tcomb';
import allQueries from 'queries';
import * as allCommands from 'commands';
import { connect as declareConnect, AppState, appState } from 'state';
import { Type } from 'tcomb';
import { ObjectOmit } from 'typelevel-ts';
import { Connect } from 'buildo-state/lib/connect';
import { StateT } from 'buildo-state/lib/StateT';

// TODO(typo): this can't be easily moved to buildo-react-container.d.ts
// since we are changing signature of `container` (currying)

interface ContainerFactoryArgs<State extends StateT> {
  appState: t.Interface<State>;
  declareConnect: Connect<State>;
  allQueries: any;
  allCommands: any;
}

const containerFactory = <State extends StateT>(args: ContainerFactoryArgs<State>) => _containerFactory(args);

const _container = containerFactory<AppState>({ appState, declareConnect, allQueries, allCommands });

const container = <P>(C: React.ComponentType<P>) => <AllCommands extends typeof allCommands = typeof allCommands>(cfg?: {
  connect?: (keyof AppState)[],
  local?: { [k in keyof AppState]?: Type<any> },
  queries?: string[],
  commands?: (keyof AllCommands)[],
  mapProps?: (cProps: object) => ObjectOmit<P, 'readyState'> | null,
  isReady?: (rs: { readyState: {} }) => boolean, // TODO(typo): better types here
  reduceQueryProps?: (...args: any[]) => any, // TODO(typo): better types here
  propTypes?: { [k: string]: Type<any> },
  pure?: boolean,
  querySync?: boolean
}) => _container(C, cfg) as Never;

export default container;
