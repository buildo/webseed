import { Command } from 'avenger-lib-graph';
import queries from 'queries';

export const doRefreshUser = Command({
  id: 'doRefreshUser',
  invalidates: { user: queries.user },
  params: {},
  run: () => Promise.resolve()
});

import * as qs from 'qs';
import trim =require('lodash/trim');
import { serializeView } from 'model';

export const doUpdateView = Command({
  id: 'doUpdateView',
  invalidates: { view: queries.view },
  params: {},
  run: (view) => new Promise(resolve => {
    setTimeout(resolve);
    const { pathname, search } = serializeView(view);
    const searchQuery = search && Object.keys(search).length > 0 ? `?${qs.stringify(search)}` : '';
    if (
      trim(pathname, ' /') !== trim(window.location.pathname, ' /') ||
      trim(searchQuery, ' ?') !== trim(window.location.search, ' ?')
    ) {
      const url = `${pathname}${searchQuery}`;
      window.history.pushState(null, '', url);
    }
  })
});

export const doLogin = Command({
  id: 'doLogin',
  invalidates: { token: queries.token },
  params: {},
  run: () => {
    localStorage.setItem('token', 'secrettoken');
    return Promise.resolve();
  }
});

export const doLogout = Command({
  id: 'doLogout',
  invalidates: { token: queries.token },
  params: {},
  run: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
});
