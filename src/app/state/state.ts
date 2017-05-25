import init from 'buildo-state/lib';
import * as t from 'tcomb';

export interface AppState {
  token?: string,
  view: string
  formal?: boolean
};
export const AppState = t.interface<AppState>({
  token: t.maybe(t.String),
  view: t.String,
  formal: t.maybe(t.Boolean)
}, { strict: true });

export const { run, connect, appState } = init<AppState>(AppState);
import { TransitionFunction } from 'buildo-state/lib/transition';
export type TransitionFunction = TransitionFunction<AppState>;
