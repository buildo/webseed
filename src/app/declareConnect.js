import connect from 'state/connect';

export { ConnectContextTypes } from 'state/connect';

export default function(decl = {}, config = {}) {
  return connect(decl, {
    killProps: ['params', 'query', 'router'],
    ...config
  });
}