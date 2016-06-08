import React from 'react';
import ReactDOM from 'react-dom';
import t from 'tcomb';
import config from '../../config';
import Router from 'react-router';
import {
  makeOnBrowserChange,
  mergeStateAndBrowserState,
  makeSyncToBrowser
 } from '../app/state-react-router';
import routes from 'routes';
import debug from 'debug';
import mkAvenger from 'avenger';
import { QueriesContextTypes } from 'react-avenger/queries';
import { CommandsContextTypes } from 'react-avenger/commands';
import queries from 'queries';
import _commands from 'commands';
import run from 'state/run';
import mapValues from 'lodash/mapValues';

import 'assets';

if (process.env.NODE_ENV === 'development') {
  // lighten stringify
  // TODO(gio): maybe not..
  // convert assert messages to lazy ones in all deps instead?
  t.stringify = String;

  // export for debug
  window.React = React;

  debug.enable(config.debug || '');
} else {
  debug.disable();
}

const log = debug('app:client');

function renderApp(mountNode: HTMLElement) {

  const router = Router.create({
    routes, location: Router.HashLocation
  });

  const initialState = {};

  const avenger = mkAvenger(queries);
  avenger.error.subscribe(::console.error); // eslint-disable-line no-console

  const commands = mapValues(_commands, cmd => params => avenger.runCommand(cmd, params));

  run({
    initialState,
    syncToBrowser: makeSyncToBrowser(router),
    mergeStateAndBrowserState,
    provideContext: {
      avenger, commands
    },
    provideContextTypes: {
      ...QueriesContextTypes,
      ...CommandsContextTypes
    },
    onBrowserChange: makeOnBrowserChange(
      router,
      Handler => () => <Handler /> // eslint-disable-line react/display-name
    ),
    render: (element: t.ReactElement) => {
      ReactDOM.render(element, mountNode);
    },
    subscribe: s => {
      log('state', s);
    }
  });

}

export function main(
  mountNode: HTMLElement,
  initialState: ?Object,
  initialCache
) {
  renderApp(mountNode, initialState, initialCache);
}
