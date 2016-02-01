import React from 'react';
import config from '../../config';
import { CookieSerializer, t } from 'revenge';
import run from 'state/run';
import mkAvenger from 'avenger';
import debug from 'debug';
import { browserHistory, hashHistory } from 'react-router';
import API from 'HTTPAPI';
import loadLocale from './loadLocale';
import routes from 'routes';
import getQueries from 'queries';
import mkContextWrapper from 'state/mkContextWrapper';
import { QueriesContextTypes } from 'state/queries';

import 'assets';

if (process.env.NODE_ENV === 'development') {
  // Monkey-patch fixed data table so that expensive prop type checks are avoided in dev mode
  require('patch-fixed-data-table');

  // Make tcomb structs "strict"
  // TODO(gio): check this works for real
  // require('patch-tcomb-struct');

  // lighten stringify
  // TODO(gio): maybe not..
  // convert assert messages to lazy ones in all deps instead?
  t.stringify = String;

  // export for debug
  window.React = React;

  // fail loudly
  t.fail = function (message) {
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

  return function renderAppWithLocale(intlData) {

    const universe = getQueries(API);
    const av = mkAvenger(universe);
    av.$graph.subscribe(v => {
      console.log('---', v);
    });

    const Provider = mkContextWrapper({
      avenger: av
    }, QueriesContextTypes);

    const token = CookieSerializer.deserialize();

    const history = config.iso ? browserHistory : hashHistory;

    run({
      mountNode,
      initialState: { token },
      routes,
      history,
      subscribe: s => {
        console.log('>> state', s);
        av.setState(s);
      },
      createElement: (Component, { children }) => {
        const props = { ...intlData };
        if (children) {
          props.child = children;
        }
        return (
          <Provider>
            {() => <Component { ...props } />}
          </Provider>
        );
      }
    });

  };

}

const supportedLocales = require.context('locales/', false, /^\.\/[^\.]*$/).keys().map(localePath => localePath.split('/')[1]);

export function main(mountNode: HTMLElement, initialState: ?Object, initialCache, requiredLocale: ?string) {
  const localeSupported = supportedLocales.indexOf(requiredLocale) !== -1;
  const locale = localeSupported ? requiredLocale : 'en';

  log(`locale required: ${requiredLocale}, actual: ${locale}`);

  loadLocale(locale).then(renderApp(mountNode, initialState, initialCache)).catch(::console.error); // eslint-disable-line no-console
}
