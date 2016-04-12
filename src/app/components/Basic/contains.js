import React from 'react';

// to be passed as template to revenge.skinnable decorator
// e.g @skinnable(contains(Component))

export default Component => locals => <Component {...locals} />; //eslint-disable-line
