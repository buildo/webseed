import React from 'react';
import { RouteHandler } from 'react-router';
import { props, t } from 'revenge';
import { intl, FlexView } from 'Basic';

const intlProps = {
  messages: t.Any,
  locales: t.list(t.Str),
  formats: t.Any
};

@intl
@props(intlProps)
export default class AppHandler extends React.Component {

  render() {
    return (
      <FlexView column hAlignContent='center' height='100%'>
        <RouteHandler />
      </FlexView>
    );
  }

}
