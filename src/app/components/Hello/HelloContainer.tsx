import * as React from 'react';
import Hello from './Hello';
import { declareQueries, declareCommands } from 'container';

const queries = declareQueries(['user', 'formal'])
const commands = declareCommands(['doRefreshUser', 'doUpdateFormal'])

type Props = {
  formal?: boolean,
  doUpdateFormal: (o: { formal: boolean }) => Promise<void>
  user: string,
  doRefreshUser: () => Promise<void>,
  readyState: any // TODO
};

class HelloContainer extends React.Component<Props> {
  render() {
    const { formal = false, doUpdateFormal, user, doRefreshUser, readyState: { user: { loading } } } = this.props;
    const props = {
      toggle: () => {
        doUpdateFormal({ formal: !formal });
      },
      formal,
      user,
      onRefreshClick: doRefreshUser,
      loading
    }

    return <Hello {...props} />;
  }
}

export default commands(queries(HelloContainer));
