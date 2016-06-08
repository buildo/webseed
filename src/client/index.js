import React from 'react';
import t from 'tcomb';
import config from '../../config';
import Router from 'react-router-transition-context';
import {
  makeOnBrowserChange,
  mergeStateAndBrowserState,
  makeSyncToBrowser
 } from '../app/state-react-router';
import routes from 'routes';
import debug from 'debug';
import mkAvenger from 'avenger';
import { QueriesContextTypes } from 'react-avenger/queries';
import queries from 'queries';
import run from 'state/run';

import 'assets';

if (process.env.NODE_ENV === 'development') {
  // lighten stringify
  // TODO(gio): maybe not..
  // convert assert messages to lazy ones in all deps instead?
  t.stringify = String;

  // export for debug
  window.React = React;

  // fail loudly
  t.fail = function(message) {
    if (!t.fail.failed) {
      debugger; //eslint-disable-line no-debugger
      t.fail.failed = true;
    }
    throw new TypeError(message);
  };

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

  run({
    initialState,
    syncToBrowser: makeSyncToBrowser(router),
    mergeStateAndBrowserState,
    provideContext: {
      avenger
    },
    provideContextTypes: {
      ...QueriesContextTypes
    },
    onBrowserChange: makeOnBrowserChange(
      router,
      Handler => () => <Handler /> // eslint-disable-line react/display-name
    ),
    render: (element: t.ReactElement) => {
      React.render(element, mountNode);
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
