import repeat from 'lodash/repeat';
import partialRight from 'lodash/partialRight';
import t from 'tcomb';

export default function(config, loadMessagesFor) {
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

  return function loadLocale(locale) {
    return new Promise(resolve => {
      return loadMessagesFor(locale).then(longerStrings).then(resolve.bind(this));
    });
  };
}
