import React from 'react';
import Hello from 'Hello/HelloContainer';
import { FlexView as View } from 'Basic';
import Logout from 'Logout/LogoutContainer';

export default class HelloHandler extends React.Component {

  render() {
    return (
      <View column height={100}>
        <Hello />
        <Logout />
      </View>
    );
  }

}
