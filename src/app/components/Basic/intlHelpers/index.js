import React from 'react';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';

export {
  IntlProvider, FormattedMessage, FormattedNumber, FormattedRelative,
  childContextTypes, getChildContext
} from 'react-intl';

const methods = [
  'formatPlural',
  'formatDate',
  'formatTime',
  'formatNumber',
  'formatRelative'
];

export const intlMethods = (Component) => (

  @injectIntl
  class IntlComponent extends React.Component {

    maybeWarnForOverride(method) {
      if (process.env.NODE_ENV !== 'production') {
        if (Component.prototype[method] && !Component.prototype[method].__mine) {
          console.warn(`Overriding instance method '${method}' for Component '${Component.name}'`); // eslint-disable-line no-console
        }
      }
    }

    constructor(props) {
      super(props);
      // all normal intl methods
      methods.forEach(method => {
        if (!Component.prototype[method] || !Component.prototype[method].__mine) {
          this.maybeWarnForOverride(method);

          Component.prototype[method] = (...args) => {
            return props.intl[method].call(this, ...args);
          };
          Component.prototype[method].__mine = true;
        }
      });

      // `formatMessage` passing flat arguments
      if (!Component.prototype.formatMessage || !Component.prototype.formatMessage.__mine) {
        this.maybeWarnForOverride('formatMessage');

        Component.prototype.formatMessage = (key, ...args) => {
          return props.intl.formatMessage.apply(this, [{ id: key }, ...args]);
        };
        Component.prototype.formatMessage.__mine = true;
      }
    }

    render() {
      return <Component {...omit(this.props, 'intl')} />;
    }
  }
);

