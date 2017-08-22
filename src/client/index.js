import config from 'config';
import prelude from './prelude';
import { addLocaleData } from 'react-intl';
import { transitionReducer } from 'transitions';
import { isLocalKey } from 'buildo-react-container';

prelude(config);

// using require to guarantee they're imported after the prelude is called
const baseIndex = require('./index.base').default;
const queries = require('queries').default;
const commands = require('commands');

const addLocaleDataAndResolve = (locale, resolve) => {
  return (intl, localeData) => {
    addLocaleData(localeData);
    resolve({ ...intl, locale });
  };
};

function loadLocaleMessages(locale) {
  return new Promise(resolve => {
    switch (locale) {
      case 'it':
        return require(
          ['locales/it', 'react-intl/locale-data/it'],
          addLocaleDataAndResolve(locale, resolve)
        );
      case 'en':
      default:
        return require(
          ['locales/en', 'react-intl/locale-data/en'],
          addLocaleDataAndResolve(locale, resolve)
        );
    }
  });
}

const serializeExclude = ['locale', 'token'];

const shouldSerializeKey = k => !isLocalKey(k) && serializeExclude.indexOf(k) === -1;
export const main = baseIndex({
  config,
  loadLocaleMessages,
  queries,
  commands,
  transitionReducer,
  shouldSerializeKey
});
