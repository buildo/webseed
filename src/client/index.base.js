import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import makeLoadLocale from './loadLocale';
import { query, runCommand } from 'avenger/lib/graph';
import { QueriesContextTypes, CommandsContextTypes } from 'container';
import App from 'components/App';
import mkContextWrapper from 'buildo-state/lib/ContextWrapper';

import 'assets';

const log = debug('app:client');

export default function({
  config,
  loadLocaleMessages,
  queries: graph = {},
  commands: _commands = {}
}) {

  const loadLocale = makeLoadLocale(config, loadLocaleMessages);

  function renderApp(mountNode) {
    return function renderAppWithLocale(intlData) {

      const commands = Object.keys(_commands).reduce((ac, id) => ({
        ...ac,
        [id]: params => runCommand(
          graph, _commands[id], params
        )
      }), {});

      const Provider = mkContextWrapper({
        graph, query, commands
      }, {
        ...QueriesContextTypes, ...CommandsContextTypes
      });

      ReactDOM.render((
        <Provider>
          {() => <App {...intlData} />}
        </Provider>
      ), mountNode);
    };
  }

  return function main(mountNode, requiredLocale) {
    const localeSupported = process.env.__supportedLocales__.indexOf(requiredLocale) !== -1;
    const locale = localeSupported ? requiredLocale : 'en';

    log(`locale required: ${requiredLocale}, actual: ${locale}`);

    loadLocale(locale).then(renderApp(mountNode)).catch(console.error.bind(console)); // eslint-disable-line no-console
  };
}
