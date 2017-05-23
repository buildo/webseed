import t from 'tcomb';
import React from 'react';
import debug from 'debug';

export default (config) => {
  // blindly polyfill for IE11
  require('es6-promise').polyfill();

  // make structs strict by default
  t.struct.strict = true;

  if (process.env.NODE_ENV === 'development') { // DEV only
    // lighten stringify

    // convert assert messages to lazy ones in all deps instead?
    t.stringify = String;

    // nice formatter for chrome dev tools
    require('tcomb/lib/installTypeFormatter')();

    // export for debug
    window.React = React;

    // export for perf testing
    window.Perf = require('react-addons-perf');

    debug.enable(config.debug || '');
  } else {
    debug.disable();
  }

  if (process.env.NODE_ENV !== 'production') { // CI and dev
    // fail loudly
    t.fail = function(message) {
      if (!t.fail.failed) {
        debugger; // eslint-disable-line no-debugger
        t.fail.failed = true;
      }
      throw new TypeError(message);
    };
  }
};
