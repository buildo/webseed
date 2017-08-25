import * as Cookies from 'cookies-js';

type SetterOptions = {
  cookieSetter?: ((value: string) => void),
  key?: string
};

type GetterOptions = {
  cookieGetter?: ((value: string) => void),
  key?: string
};

export default {

  serialize(value: string, options: SetterOptions = {}) {
    const { cookieSetter = null, key = 'AUTH_TOKEN' } = options;
    (cookieSetter || Cookies.set)(key, JSON.stringify(value));
  },

  deserialize(options: GetterOptions = {}) {
    const { cookieGetter = null, key = 'AUTH_TOKEN' } = options;
    return JSON.parse((cookieGetter || Cookies.get)(key) || 'null');
  }

};
