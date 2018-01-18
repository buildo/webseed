import { Query } from 'avenger-lib-graph';
import { Expire, available } from 'avenger/lib/cache/strategies';
import * as API from 'API';

export const user = Query({
  id: 'user',
  params: {},
  cacheStrategy: new Expire(2000),
  fetch: API.getUser
});

import * as qs from 'qs';
import { deserializeView } from 'model';
import { setTimeout } from 'timers';

export const location = Query({
  id: 'location',
  params: {},
  fetch: () => Promise.resolve(window.location)
});

export const view = Query({
  id: 'view',
  params: {},
  dependencies: { location: { query: location } },
  fetch: ({ location: { pathname, search } }) => {
    return Promise.resolve(
      deserializeView(pathname, qs.parse(search, { ignoreQueryPrefix: true }))
    );
  }
});

export const formal = Query({
  id: 'formal',
  params: {},
  dependencies: { view: { query: view } },
  fetch: ({ view }) => Promise.resolve(view.view === 'hello' && view.formal || false)
});

export const token = Query({
  id: 'token',
  params: {},
  fetch: () => Promise.resolve(localStorage.getItem('token'))
});

export const isLoggedIn = Query({
  id: 'isLoggedIn',
  params: {},
  dependencies: { token: { query: token } },
  fetch: ({ token }) => Promise.resolve(!!token)
});

export const authenticatedNumber = Query({
  id: 'authenticatedNumber',
  cacheStrategy: available,
  params: {},
  dependencies: { isLoggedIn: { query: isLoggedIn } },
  fetch: ({ isLoggedIn }) => new Promise(resolve => {
    setTimeout(() => {
      resolve(isLoggedIn ? Math.random() : undefined);
    }, 500);
  })
});