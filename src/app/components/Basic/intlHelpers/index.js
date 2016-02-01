export {
  intl, FormattedDate, FormattedNumber, FormattedRelative, FormattedTime,
  childContextTypes, getChildContext, contextTypes
} from 'react-intl-hoc';

import get from 'lodash/get';
import {
  keyMapFM,
  intlMethods as originalIntlMethods,
  translateProps as originalTranslateProps
} from 'react-intl-hoc';

function messageExists(key) {
  return !!get(this.context.messages, key);
}

export const FormattedMessage = keyMapFM(msg => msg);

export const intlMethods = originalIntlMethods(msg => msg, messageExists);

export const translateProps = originalTranslateProps(msg => msg, messageExists);
