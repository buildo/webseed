import * as React from 'react';
import { IntlProvider } from 'Basic';
import Hello from 'Hello';
import { declareCommands, SwitchView } from 'container';
import { View, AnotherView } from 'model-ts';
import LoginButton from 'LoginButton';
import Another from 'Another';

const commands = declareCommands(['doUpdateView'])

type Props = {
  messages: any,
  locales: string[],
  formats: any,
  locale: string,
  doUpdateView: (v: View) => Promise<void>
};

type State = {
  id: number
}

class App extends React.Component<Props, State> {
  state = {
    id: Math.floor(100 * Math.random())
  }

  render() {
    const doUpdateView = this.props.doUpdateView;

    return (
      <IntlProvider {...this.props}>
        <div className='layout'>
          <button onClick={() => doUpdateView({ view: 'hello' })}>Hello</button>
          <button onClick={() => doUpdateView({ view: 'another', id: this.state.id })}>Another view</button>
          <LoginButton />
          <SwitchView>{{
            hello: () => <Hello />,
            another: (view: AnotherView) => <Another id={view.id} />,
            notFound: () => <div>not found!</div>
          }}</SwitchView>
        </div>
      </IntlProvider>
    );
  }
}

export default commands(App);