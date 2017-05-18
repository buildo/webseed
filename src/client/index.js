import config from 'config';
import prelude from './prelude';
import { addLocaleData } from 'react-intl';
import itLocaleData from 'react-intl/locale-data/it';
import enLocaleData from 'react-intl/locale-data/en';
import { transitionReducer } from 'transitions';
import { isLocalKey } from 'buildo-react-container';

prelude(config);

// using require to guarantee they're imported after the prelude is called
const baseIndex = require('./index.base').default;
const routes = require('routes').default;
const queries = require('queries').default;
const commands = require('commands');

function loadLocaleMessages(locale) {
  return new Promise(resolve => {
    switch (locale) {
      case 'it':
        addLocaleData(itLocaleData);
        return require(['locales/it'], (intl) => resolve({
          ...intl,
          locale
        }));

      case 'en':
      default:
        addLocaleData(enLocaleData);
        return require(['locales/en'], (intl) => resolve({
          ...intl,
          locale
        }));
    }
  });
}

const serializeExclude = [
  'locale', 'token',
  'pickUpLocationQuery',
  'dropOffLocationQuery'
];

const shouldSerializeKey = k => !isLocalKey(k) && serializeExclude.indexOf(k) === -1;
export const main = baseIndex({
  config,
  routes,
  loadLocaleMessages,
  queries,
  commands,
  transitionReducer,
  shouldSerializeKey
});
