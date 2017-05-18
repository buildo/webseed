import React from 'react';
import { props } from 'tcomb-react';
import { IntlProvider } from 'Basic';
import t from 'tcomb';
import { RouteHandler } from 'react-router';

@props({
  messages: t.Any,
  locales: t.list(t.String),
  formats: t.Any,
  locale: t.String
})
export default class AppHandler extends React.Component {
  render = () => {
    return (
      <IntlProvider {...this.props}>
        <div className='layout'>
          <RouteHandler />
        </div>
      </IntlProvider>
    );
  }
}
