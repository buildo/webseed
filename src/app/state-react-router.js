import t from 'tcomb';
import identity from 'lodash/identity';
import omitBy from 'lodash/omitBy';
import routes from './routes';
import _isViewActive from 'buildo-state-react-router/lib/isViewActive';
import routerDiff from 'buildo-state-react-router/lib/routerDiff';
import shallowEqual from 'buildo-state/lib/shallowEqual';

const routerStateKey = 'view';
const routerStatePathParamKeys = [];

const boolean = {
  matchString: v => v === 'true' || v === 'false',
  matchInstance: t.Boolean.is,
  parse: v => v === 'true',
  stringify: identity
};

const paramsParsers = [
  boolean
];

const shouldRouterPatchBePushed = ({
  state: oldState, params: oldPathParams
}, {
  state: newState, params: newPathParams
}) => oldState !== newState || !shallowEqual(
  omitBy(oldPathParams, t.Nil.is),
  omitBy(newPathParams, t.Nil.is)
);

export const {
  makeOnBrowserChange,
  makeSyncToBrowser
} = routerDiff({
  routerStateKey,
  routerStatePathParamKeys,
  paramsParsers,
  shouldRouterPatchBePushed
});

export const isViewActive = _isViewActive(routes);
