import React from 'react';
import config from '../../config';
import { CookieSerializer, t } from 'revenge';
import Router from 'react-router-transition-context';
import {
  makeOnBrowserChange,
  mergeStateAndBrowserState,
  makeSyncToBrowser
 } from '../app/state-react-router';
import API from 'HTTPAPI';
import getQueries from 'queries';
import getCommands from 'commands';
import routes from 'routes';
import debug from 'debug';

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

const queries = getQueries(API);
const _commands = getCommands(API, queries);

import loadLocale from './loadLocale';
import mkAvenger from 'avenger';
import run from 'state/run';
import { QueriesContextTypes } from 'declareQueries';
import { CommandsContextTypes } from 'declareCommands';

const log = debug('app:client');

function renderApp(mountNode: HTMLElement) {

  return function renderAppWithLocale(intlData) {

    const router = Router.create({
      routes, location: Router.HashLocation
    });

    const token = CookieSerializer.deserialize();
    const initialState = { token };

    const avenger = mkAvenger(queries, 1000);
    avenger.error.subscribe(::console.error); // eslint-disable-line no-console

    const wrapCommand = (id, cmd, params) => {
      // not cloning args in any way, expecting everybody to be nice
      return avenger.runCommand(cmd, params).catch(err => {
        console.error(err); // eslint-disable-line no-console
        throw err;
      });
    };

    const commands = Object.keys(_commands).reduce((ac, id) => ({
      ...ac,
      [id]: params => wrapCommand(
        id, _commands[id], params
      )
    }), {});

    run({
      initialState,
      syncToBrowser: makeSyncToBrowser(router),
      mergeStateAndBrowserState,
      onBrowserChange: makeOnBrowserChange(
        router,
        Handler => () => <Handler {...intlData} /> // eslint-disable-line react/display-name
      ),
      provideContext: {
        avenger, commands
      },
      provideContextTypes: {
        ...QueriesContextTypes, ...CommandsContextTypes
      },
      render: (element: t.ReactElement) => {
        React.render(element, mountNode);
      },
      subscribe: s => {
        log('state', s);
      },
      init: (stateSubject, transition) => {
        avenger.error.subscribe(({ error, source }) => {
          if (error.status === 401) {
            transition({ token: null });
          }
          if (source === 'runCommand' && error.data && error.data.message) {
            transition({ error: error.data });
          }
        });
      }
    });
  };

}

const supportedLocales =
  require.context('locales/', false, /^\.\/[^\.]*$/).keys()
    .map(localePath => localePath.split('/')[1]);

export function main(
  mountNode: HTMLElement,
  initialState: ?Object,
  initialCache,
  requiredLocale: ?string
) {
  const localeSupported = supportedLocales.indexOf(requiredLocale) !== -1;
  const locale = localeSupported ? requiredLocale : 'en';

  log(`locale required: ${requiredLocale}, actual: ${locale}`);

  loadLocale(locale)
    .then(renderApp(mountNode, initialState, initialCache))
    .catch(::console.error); // eslint-disable-line no-console
}
