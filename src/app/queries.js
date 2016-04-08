import { Query } from 'avenger';
import t from 'tcomb';
import { User } from 'domain';

export default (API) => {

  const user = Query({
    id: 'user',
    params: {
      token: t.String
    },
    returnType: User,
    fetch: ({ token }) => {
      return API.getUser(token);
    }
  });

  return {
    user
  };
};
