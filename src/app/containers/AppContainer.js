import React from 'react';
import { props, t } from 'revenge';
import { intl, FlexView } from 'Basic';
import { intlMethods } from 'intlHelpers';
import connect from 'state/connect';

const intlProps = {
  messages: t.Any,
  locales: t.list(t.Str),
  formats: t.Any
};

@connect(() => ({}))
@intl
@intlMethods
@props({
  child: t.ReactChild,
  transition: t.Function,
  ...intlProps
})
export default class AppContainer extends React.Component {

  render() {
    return (
      <FlexView height='100%'>
        <h1 style={{ textAlign: 'center' }}>
          {this.formatMessage('App.title')}
        </h1>
        {this.props.child}
      </FlexView>
    );
  }

}
