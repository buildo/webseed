import identity from 'lodash/identity';
import pick from 'lodash/pick';
import toPairs from 'lodash/toPairs';

/* eslint-disable no-loops/no-loops */
/* this stuff better be efficient */
const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }
  let key;
  // Test for A's keys different from B.
  for (key in objA) {
    if (objA.hasOwnProperty(key) &&
        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
      return false;
    }
  }
  // Test for B's keys missing from A.
  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
/* eslint-enable no-loops/no-loops */

const routerStateKey = 'view';
const routerStateParamKeys = ['username'];
const routerStateQueryParamKeys = [];

export function routerStateDiff(oldState, newState) {
  const newPathname = oldState.pathname !== newState.pathname ? newState.pathname : undefined;

  const routerStateParams = pick(newState, routerStateParamKeys);
  const oldRouterStateParams = pick(oldState, routerStateParamKeys);
  const newRouterStateParams = !shallowEqual(
    routerStateParams, oldRouterStateParams
  ) ? routerStateParams : undefined;

  const routerStateQueryParams = pick(newState, routerStateQueryParamKeys);
  const oldRouterStateQueryParams = pick(oldState, routerStateQueryParamKeys);
  const newRouterStateQueryParams = !shallowEqual(
    routerStateQueryParams, oldRouterStateQueryParams
  ) ? routerStateQueryParams : undefined;


  const params = oldState.pathname.split('/').map(pathSegment => {
    const kv = toPairs(oldRouterStateParams).filter(kv => kv[1] === pathSegment)[0];
    if (kv) {
      return `:${kv[0]}`;
    } else {
      return pathSegment;
    }
  });

  console.log(params);
  debugger;

  if (newPathname || newRouterStateParams || newRouterStateQueryParams) {
    const x = {
      pathname: newPathname,
      params: newRouterStateParams,
      query: newRouterStateQueryParams
    };
    const patch = Object.keys(x).reduce((o, k) => {
      if (x[k]) {
        o[k] = x[k];
      }
      return o;
    }, {});
    return patch;
  } else {
    return false;
  }
}

export function statePatchFromRouter(routerState) {
  return {
    [routerStateKey]: routerState.routes.map(r => r.name).filter(identity).reverse()[0],
    ...routerState.params,
    ...routerState.query
  };
}

export function shouldRouterPatchBePushed({
  state: oldState, params: oldParams/*, query: oldQuery*/
}, {
  state: newState, params: newParams/*, query: newQuery*/
}) {
  if (newState !== null && newState !== oldState) {
    return true;
  }

  if (newParams !== null && !shallowEqual(newParams, oldParams)) {
    return true;
  }

  // ignoring all query params for simplicity for now (always replaced)
  return false;
}
