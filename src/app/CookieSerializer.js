import t from 'tcomb';
import Cookies from 'cookies-js';

export default {

  serialize(token: ?t.String, { cookieSetter = null, key = 'AUTH_TOKEN' } = {}) {
    (cookieSetter || Cookies.set)(key, JSON.stringify(token));
  },

  deserialize({ cookieGetter = null, key = 'AUTH_TOKEN' } = {}) {
    return JSON.parse((cookieGetter || Cookies.get)(key) || 'null');
  }

};
