import * as React from 'react';
import { IntlProvider } from 'Basic';
import Hello from 'Hello';

type Props = {
  messages: any,
  locales: string[],
  formats: any,
  locale: string
};

export default class App extends React.Component<Props> {
  render() {
    return (
      <IntlProvider {...this.props}>
        <div className='layout'>
          <Hello />
        </div>
      </IntlProvider>
    );
  }
}
