import { Command } from 'avenger';
import { CookieSerializer } from 'revenge';
import t from 'tcomb';

export default (API, /* queries */) => {

  const doLogin = Command({
    id: 'doLogin',
    params: { username: t.String, password: t.String },
    run: ({ username, password }) => API.login({ username, password }).then(({ credentials: { token } }) => {
      CookieSerializer.serialize(token);
      return Promise.resolve({ token });
    })
  });

  return {
    doLogin
  };

};
