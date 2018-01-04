import * as React from 'react';
import { declareQueries, declareCommands } from 'container';

const queries = declareQueries(['isLoggedIn']);
const commands = declareCommands(['doLogin', 'doLogout']);

type Props = {
  doLogout: () => Promise<void>,
  doLogin: () => Promise<void>,
  isLoggedIn?: boolean
}

class LoginButton extends React.Component<Props> {
  render() {
    const { isLoggedIn, doLogin, doLogout } = this.props;
    const action = isLoggedIn ? doLogout : doLogin;
    const label = isLoggedIn ? 'Logout' : 'Login';

    return <button onClick={action}>{label}</button>;
  }
}

export default commands(queries(LoginButton))