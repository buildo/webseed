import { Query } from 'avenger/lib/graph';
import { Expire, available } from 'avenger/lib/cache/strategies';
import t from 'tcomb';
import * as API from 'API';

export const user = Query({
  id: 'user',
  chacheStrategy: new Expire(2000),
  returnType: t.String,
  fetch: API.getUser
});

import qs from 'qs';
import { deserializeView } from 'model-ts';
import { setTimeout } from 'timers';

export const location = Query({
  id: 'location',
  returnType: t.Object, // TODO: Location
  fetch: () => Promise.resolve(window.location)
});

export const view = Query({
  id: 'view',
  dependencies: { location: { query: location } },
  returnType: t.Any, // TODO: View
  fetch: ({ location: { pathname, search } }) => {
    return Promise.resolve(
      deserializeView(pathname, qs.parse(search, { ignoreQueryPrefix: true }))
    );
  }
});

export const formal = Query({
  id: 'formal',
  dependencies: { view: { query: view } },
  returnType: t.Boolean,
  fetch: ({ view }) => Promise.resolve(view.view === 'hello' && view.formal)
});

export const token = Query({
  id: 'token',
  returnType: t.String,
  fetch: () => Promise.resolve(localStorage.getItem('token'))
});

export const isLoggedIn = Query({
  id: 'isLoggedIn',
  dependencies: { token: { query: token } },
  returnType: t.Boolean,
  fetch: ({ token }) => Promise.resolve(!!token)
});

export const authenticatedNumber = Query({
  id: 'authenticatedNumber',
  chacheStrategy: available,
  dependencies: { isLoggedIn: { query: isLoggedIn } },
  returnType: t.maybe(t.Number),
  fetch: ({ isLoggedIn }) => new Promise(resolve => {
    setTimeout(() => {
      resolve(isLoggedIn ? Math.random() : undefined);
    }, 500);
  })
});