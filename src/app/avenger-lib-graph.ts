import {
  Query as _Query,
  Command as _Command,
  QueryReturn, QueryFetch,
  CommandRun, CommandReturn, InvA
} from 'avenger/lib/graph';
import { Strategy } from 'avenger/lib/cache/strategies';
import * as _t from 'tcomb';
import * as t from 'io-ts';
import mapValues = require('lodash/mapValues');
import { ObjectOverwrite } from 'typelevel-ts';

function iotsTypeToTcombIrreducible(iot: t.Type<any, any>): _t.Type<any> {
  return _t.irreducible(`tcomb_${iot.name}`, v => iot.is(v));
}

type IOTSParams = { [k: string]: t.Type<any, any> };

type QueryArgsNoDeps<
  _A extends IOTSParams,
  P
  > = {
    id: string,
    cacheStrategy?: Strategy,
    params: _A,
    fetch: QueryFetch<IOTSDictToType<_A>, P>,
  };

type Dependencies = { [k: string]: { query: QueryReturn<any, any> } };

type QueryArgs<
  _A extends IOTSParams,
  P,
  D extends Dependencies
  > = ObjectOverwrite<QueryArgsNoDeps<_A, P>, {
    fetch: QueryFetch<IOTSDictToType<_A> & {[k in keyof D]: D[k]['query']['_P']}, P>
  }> & {
    dependencies: D
  };

type IOTSDictToType<O extends IOTSParams> = {[k in keyof O]: t.TypeOf<O[k]> };

type DepA<D extends Dependencies> = {[k in keyof D]: D[k]['query']['_A']}[keyof D];

export function Query<_A extends IOTSParams, P>(args: QueryArgsNoDeps<_A, P>): QueryReturn<IOTSDictToType<_A>, P>;
// TODO: looks like a single overload is enough?
export function Query<_A extends IOTSParams, P,
  D1 extends Dependencies
  >(args: QueryArgs<_A, P, D1>): QueryReturn<IOTSDictToType<_A> & DepA<D1>, P>;
export function Query<_A extends IOTSParams, P,
  D1 extends Dependencies
  >(args: QueryArgs<_A, P, D1>): QueryReturn<IOTSDictToType<_A> & DepA<D1>, P> {
  type A = IOTSDictToType<_A>;
  const params = mapValues(args.params, iotsTypeToTcombIrreducible) as any as {[k in keyof A]: _t.Type<any> };
  return _Query<A, P>({
    id: args.id,
    cacheStrategy: args.cacheStrategy,
    dependencies: args.dependencies,
    params,
    returnType: _t.Any, // TODO: useless now
    fetch: args.fetch
  });
}

type CommandArgsNoInvs<
  _A extends IOTSParams,
  R
  > = {
    id: string,
    params: _A,
    run: CommandRun<IOTSDictToType<_A>, R>,
  };

type Invalidates = { [k: string]: QueryReturn<any, any> };

type CommandArgs<
  _A extends IOTSParams,
  I extends Invalidates,
  R
  > = ObjectOverwrite<CommandArgsNoInvs<_A, R>, {
    run: CommandRun<IOTSDictToType<_A> & {[k in keyof I]: I[k]['query']['_A']}, R>
  }> & {
    invalidates: I
  };

export function Command<_A extends IOTSParams, R>(args: CommandArgsNoInvs<_A, R>): CommandReturn<IOTSDictToType<_A>, R>;
// TODO: looks like a single overload is enough?
export function Command<_A extends IOTSParams, R,
  I1 extends Invalidates
  >(args: CommandArgs<_A, I1, R>): CommandReturn<IOTSDictToType<_A> & InvA<I1>, R>;
export function Command<_A extends IOTSParams, R,
  I1 extends Invalidates
  >(args: CommandArgs<_A, I1, R>): CommandReturn<IOTSDictToType<_A> & InvA<I1>, R> {
  type A = IOTSDictToType<_A> & InvA<I1>;
  const params = mapValues(args.params, iotsTypeToTcombIrreducible) as any as {[k in keyof A]: _t.Type<any> };
  return _Command<A, I1, R>({
    id: args.id,
    invalidates: args.invalidates,
    params,
    run: args.run
  });
}