import { Query } from 'avenger/lib/graph';
import { Expire } from 'avenger/lib/cache/strategies';
import t from 'tcomb';
import * as API from 'API';

export const user = Query({
  id: 'user',
  chacheStrategy: new Expire(2000),
  returnType: t.String,
  params: {
    foo: t.maybe(t.String)
  },
  fetch: ({ foo }) => console.log('query', foo) || API.getUser() // eslint-disable-line no-console
});
