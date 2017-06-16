import React from 'react';
import BRCPanel from 'buildo-react-components/lib/Panel/Panel';
import skinnable from 'react-skinnable';

import './panel.scss';

@skinnable()
export default class Panel extends React.PureComponent {

  template({ type = 'docked-top', ...props }) {
    return <BRCPanel type={type} {...props} />;
  }

}
