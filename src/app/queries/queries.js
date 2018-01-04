import { Query } from 'avenger/lib/graph';
import { Expire } from 'avenger/lib/cache/strategies';
import t from 'tcomb';
import * as API from 'API';

export const user = Query({
  id: 'user',
  chacheStrategy: new Expire(2000),
  returnType: t.String,
  fetch: API.getUser
});

import qs from 'qs';

export const search = Query({
  id: 'search',
  returnType: t.dict(t.String, t.String),
  fetch: () => Promise.resolve(qs.parse(window.location.search, { ignoreQueryPrefix: true }))
});

export const formal = Query({
  id: 'formal',
  dependencies: { search: { query: search } },
  returnType: t.Boolean,
  fetch: ({ search }) => Promise.resolve(search.formal === 'true')
});
