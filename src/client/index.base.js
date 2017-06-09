import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import CookieSerializer from 'CookieSerializer';
import Router from 'react-router';
import makeLoadLocale from './loadLocale';
import { query, runCommand } from 'avenger/lib/graph';
import { run } from 'state';
import { QueriesContextTypes, CommandsContextTypes } from 'container';
import { makeOnBrowserChange, makeSyncToBrowser } from 'state-react-router';

import 'assets';

const log = debug('app:client');

export default function({
  config,
  routes, // required
  loadLocaleMessages,
  location = Router.HashLocation,
  initialState = (() => {
    const token = CookieSerializer.deserialize();
    return { token };
  })(),
  queries: graph = {},
  commands: _commands = {},
  transitionReducer, // still optional (defaults to identity in state/run)
  shouldSerializeKey
}) {

  const loadLocale = makeLoadLocale(config, loadLocaleMessages);

  function renderApp(mountNode) {
    return function renderAppWithLocale(intlData) {

      const router = Router.create({ location, routes } );

      const commands = Object.keys(_commands).reduce((ac, id) => ({
        ...ac,
        [id]: params => runCommand(
          graph, _commands[id], params
        )
      }), {});

      run({
        initialState,
        transitionReducer,
        syncToBrowser: makeSyncToBrowser(router),
        shouldSerializeKey,
        flushTimeoutMSec: 10,
        onBrowserChange: makeOnBrowserChange(
          router,
          Handler => () => <Handler {...intlData} /> // eslint-disable-line react/display-name
        ),
        provideContext: {
          graph, query, commands
        },
        provideContextTypes: {
          ...QueriesContextTypes, ...CommandsContextTypes
        },
        render: (element) => {
          ReactDOM.render(element, mountNode);
        },
        subscribe: s => {
          log('state', s);
        }
      });
    };
  }

  return function main(mountNode, requiredLocale) {
    const localeSupported = process.env.__supportedLocales__.indexOf(requiredLocale) !== -1;
    const locale = localeSupported ? requiredLocale : 'en';

    log(`locale required: ${requiredLocale}, actual: ${locale}`);

    loadLocale(locale).then(renderApp(mountNode)).catch(console.error.bind(console)); // eslint-disable-line no-console
  };
}
