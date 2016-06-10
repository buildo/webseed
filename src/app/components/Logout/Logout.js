import React from 'react';
import { pure, skinnable } from 'revenge';
import { props, t } from 'tcomb-react';
import { Button } from 'Basic';

@pure
@skinnable()
@props({
  doLogout: t.Function
})
export default class Logout extends React.Component {

  getLocals() {
    return this.props;
  }

  template({ doLogout }) {
    return <Button onClick={doLogout}>Logout</Button>;
  }

}
