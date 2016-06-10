import t from 'tcomb';
import Cookies from 'cookies-js';

export default {

  serialize(token: ?t.String, { cookieSetter = null, key = 'AUTH_TOKEN' } = {})/*: t.Nil*/ {
    (cookieSetter || Cookies.set)(key, JSON.stringify(token));
  },

  deserialize({ cookieGetter = null, key = 'AUTH_TOKEN' } = {})/*: ?t.String*/ {
    return JSON.parse((cookieGetter || Cookies.get)(key) || 'null');
  }

};