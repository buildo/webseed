import t from 'tcomb';
import identity from 'lodash/identity';
import routes from './routes';
import _isViewActive from 'state-react-router/isViewActive';
import routerDiff from 'state-react-router/routerDiff';

const routerStateKey = 'view';

// insert here any path params that appears in the route definitions
const routerStatePathParamKeys = [
  'deviceId', 'installId', 'profileId', 'ruleIndex', 'appId', 'tagId'
];

// insert here any parameter that you don't want to serialize in the URL
const ignoreParams = [
  routerStateKey,
  ...routerStatePathParamKeys,
  'token'
];

const boolean = {
  matchString: v => v === 'true' || v === 'false',
  matchInstance: t.Boolean.is,
  parse: v => v === 'true',
  stringify: identity
};

const paramsParsers = [
  boolean
];

export const {
  makeOnBrowserChange,
  makeSyncToBrowser
} = routerDiff({
  routerStateKey,
  routerStatePathParamKeys,
  ignoreParams,
  paramsParsers
});

export const isViewActive = _isViewActive(routes);
