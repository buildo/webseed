import * as React from 'react';
import { IntlProvider } from 'Basic';
import { RouteHandler } from 'react-router';

type Props = {
  messages: any,
  locales: string[],
  formats: any,
  locale: string
};

export default class AppHandler extends React.Component<Props> {
  render() {
    return (
      <IntlProvider {...this.props}>
        <div className='layout'>
          <RouteHandler />
        </div>
      </IntlProvider>
    );
  }
}
