import React from 'react';
import { FlexView } from 'Basic';
import Login from 'Login/LoginContainer';

export default class LoginHandler extends React.Component {

  render() {
    return (
      <FlexView
        height='100%'
        width='100%'
        hAlignContent='center'
        vAlignContent='center'
        style={{ position: 'relative' }}
      >
        <Login />
      </FlexView>
    );
  }

}
