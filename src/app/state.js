import t from 'tcomb';
import init from 'buildo-state/lib';

const AppState = t.interface({
  view: t.maybe(t.String),
  formal: t.maybe(t.Boolean),
  token: t.maybe(t.String),
  ___local: t.Any
}, { name: 'AppState', strict: true });

export const { run, connect } = init(AppState);

