import find from 'lodash/find';
import { t } from 'revenge';

const identity = v => v;

const string = {
  matchString: () => true,
  matchInstance: t.String.is,
  parse: identity,
  stringify: identity
};

const boolean = {
  matchString: v => v === 'true' || v === 'false',
  matchInstance: t.Boolean.is,
  parse: v => v === 'true',
  stringify: identity
};

const matchFloat = /^[\d]+(\.[\d]+)?$/;
const float = {
  matchString: ::matchFloat.exec,
  matchInstance: v => t.Number.is(v) && Math.floor(v) !== v,
  parse: parseFloat,
  stringify: identity
};

// first will match
const order = [
  boolean,
  float,
  string
];

const parseParam = value => {
  const paramType = find(order, p => p.matchString(value));
  if (paramType) {
    return paramType.parse(value);
  } else {
    return value;
  }
};

export const parseParams = params => Object.keys(params || {}).reduce((ac, paramName) => ({
  ...ac,
  [paramName]: parseParam(params[paramName])
}), {});

const stringifyParam = value => {
  const paramType = find(order, p => p.matchInstance(value));
  if (paramType) {
    return paramType.stringify(value);
  } else {
    return value;
  }
};

export const stringifyParams = params => Object.keys(params || {}).reduce((ac, paramName) => ({
  ...ac,
  [paramName]: stringifyParam(params[paramName])
}), {});
