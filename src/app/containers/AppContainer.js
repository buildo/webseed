import React from 'react';
import { RouteHandler } from 'react-router';
import { props, t } from 'revenge';
import { intl, FlexView } from 'Basic';
import { intlMethods } from 'intlHelpers';

const intlProps = {
  messages: t.Any,
  locales: t.list(t.Str),
  formats: t.Any
};

@intl
@intlMethods
@props(intlProps)
export default class AppContainer extends React.Component {

  render() {
    return (
      <FlexView column hAlignContent='center' height='100%'>
        <h1>{this.formatMessage('App.title')}</h1>
        <RouteHandler />
      </FlexView>
    );
  }

}
