import config from '../../config';
import { repeat, partialRight } from 'lodash';
import { t } from 'tcomb-react';

function longerStrings(data) {
  if (!t.Num.is(config.localStringLengthMultiplier) || config.localStringLengthMultiplier === 1) {
    return data;
  }

  const _repeat = partialRight(repeat, config.localStringLengthMultiplier);
  const _longerStrings = msgs => Object.keys(msgs).reduce((ac, k) => ({
    ...ac,
    [k]: t.Str.is(msgs[k]) ? _repeat(msgs[k]) : _longerStrings(msgs[k])
  }), {});

  return {
    ...data,
    messages: _longerStrings(data.messages)
  };
}

function loadMessagesFor(locale) {
  return new Promise(resolve => {
    require.ensure([], require => {
      resolve(
        longerStrings(require('../app/locales/' + locale)) // eslint-disable-line prefer-template
      );
    });
  });
}

function hasLocaleData(locale) {
  // http://formatjs.io/guides/runtime-environments/#polyfill-node
  return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale &&
    Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
}

function hasIntlFor(locale) {
  return window.Intl && hasLocaleData(locale);
}

export default function loadLocale(locale) {
  return new Promise(resolve => {
    if (hasIntlFor(locale)) {
      return loadMessagesFor(locale).then(resolve.bind(this));
    }

    require.ensure(['intl'], require => {
      require('intl');
      require('intl/locale-data/jsonp/' + locale); // eslint-disable-line prefer-template

      loadMessagesFor(locale).then(resolve.bind(this));
    });
  });
}
