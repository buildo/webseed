import * as React from 'react';
import Hello from './Hello';
import { declareQueries, declareCommands } from 'container';
import { View } from 'model-ts';

const queries = declareQueries(['user', 'formal'])
const commands = declareCommands(['doRefreshUser', 'doUpdateView'])

type Props = {
  formal?: boolean,
  doUpdateView: (view: View) => Promise<void>
  user?: string,
  doRefreshUser: () => Promise<void>,
  readyState: any // TODO
};

class HelloContainer extends React.Component<Props> {
  render() {
    const { formal = false, doUpdateView, user, doRefreshUser, readyState: { user: { loading } } } = this.props;
    const props = {
      toggle: () => {
        doUpdateView({ view: 'hello', formal: !formal });
      },
      formal,
      user: user || '',
      onRefreshClick: doRefreshUser,
      loading
    }

    return <Hello {...props} />;
  }
}

export default commands(queries(HelloContainer));
