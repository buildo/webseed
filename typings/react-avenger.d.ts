declare module 'react-avenger/lib/loading' {
  type RS = { readyState: {} }; // TODO(typo): better type for readyState
  export default function loading<P>(...args: any[]): (C: React.ComponentType<P>) => React.ComponentType<P & RS>;
  export function noLoaderLoading<P>(C: React.ComponentType<P>): React.ComponentType<P & RS>;
}

declare module 'react-avenger/lib/commands' {
  import { ObjectOmit } from 'typelevel-ts';

  export default function declareCommands<AllCommands extends {}>(allCommands: AllCommands):
    <Decl extends string>(commands: (keyof AllCommands)[]) =>
      <P>(C: React.ComponentType<P>) => React.ComponentType<ObjectOmit<P, Decl>>
  export const CommandsContextTypes: object;
}

declare module 'react-avenger/lib/queries';
