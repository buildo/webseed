import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouterContext, createRoutes } from 'react-router';
import { BehaviorSubject } from 'rxjs-es/subject/BehaviorSubject';
import { routerStateDiff, shouldRouterPatchBePushed } from './routerDiff';
import { ConnectContextTypes } from './connect';
import { t } from 'revenge';

function createProvideWrapper({
  stateSubject,
  getPendingState,
  setPendingState,
  routerState: { router, location, params }
}) {
  const transition = _transitionFn => {
    const transitionFn = t.Function.is(_transitionFn) ? _transitionFn : () => _transitionFn;
    const state = getPendingState() || stateSubject.getValue();
    const newState = { ...state, ...transitionFn(state) };
    const routerDiff = routerStateDiff(state, newState);
    console.log('>> transition routerDiff', routerDiff);

    if (routerDiff) {
      setPendingState({ ...(getPendingState() || {}), ...newState });

      // FIXME(gabro): as soon as we decide how to serialize the router state
      const currentRouterState = {
        params,
        pathname: location.pathname,
        query: location.query
      };
      const nextRouterState = {
        pathname: routerDiff.pathname || currentRouterState.pathname,
        params: routerDiff.params || currentRouterState.params,
        query: { ...currentRouterState.query, ...(routerDiff && routerDiff.query || {}) }
      };
      ///////////////////////////////////////////////////////////////////////

      const newLocation = { ...location, ...routerDiff };
      if (shouldRouterPatchBePushed(currentRouterState, nextRouterState)) {
        debugger;
        router.push(newLocation);
      } else {
        console.log('>> replace');
        router.replace(newLocation);
      }
    } else {
      stateSubject.next(newState);
    }
  };

  return class ProvideWrapper extends React.Component {
    static childContextTypes = ConnectContextTypes;

    getChildContext = () => ({
      transition,
      state: stateSubject
    });

    render() {
      return this.props.children();
    }
  };
}

export default function run({
  mountNode,
  routes,
  history,
  initialState = {},
  subscribe = () => {},
  createElement
}) {
  const state = new BehaviorSubject(initialState);
  state.subscribe(subscribe);
  let _newState;

  ReactDOM.render(
    <Router
      history={history}
      routes={createRoutes(routes)}
      render={(props) => {
        if (_newState) {
          console.log('>> user initiated');
          state.next(_newState);
          _newState = undefined;
        } else {
          console.log('>> browser initiated');
          // TODO(gabro)
          const { location: { pathname, query }, params } = props;
          const fromRouter = { pathname, ...params, ...query };
          state.next({ ...state.getValue(), ...fromRouter });
        }

        // TODO(gabro)
        const routerState = {
          params: props.params,
          router: props.router,
          location: props.location
        };

        const ProvideWrapper = createProvideWrapper({
          routerState,
          stateSubject: state,
          getPendingState: () => _newState,
          setPendingState: s => { _newState = s; }
        });

        return (
          <ProvideWrapper>
            {() => <RouterContext {...props} />}
          </ProvideWrapper>
        );
      }}
      createElement={createElement}
    />
  , mountNode);
}
