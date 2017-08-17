declare module 'buildo-state/lib' {
  import * as t from 'tcomb';
  import { ObjectOmit } from 'typelevel-ts';

  export type TransitionFunction<AppState> = (patch: { [k in keyof AppState]?:  AppState[k] | null }) => void

  export type Connect<AppState> =
    <Decl extends keyof AppState>(decl: (keyof AppState)[], cfg?: {}) =>
      <P>(C: React.ComponentType<P & { transition?: TransitionFunction<AppState> }>) =>
        React.ComponentType<ObjectOmit<P, Decl | 'transition'>>

  export default function init<AppState>(appState: t.Interface<any>): {
    run: (runArgs: any) => void,
    connect: Connect<AppState>,
    appState: t.Interface<AppState>
  }
}

declare module 'buildo-state/lib/connect' {
  export const ConnectContextTypes: object;
}
