import { Query } from 'revenge';

export default (API) => {

  const user = Query({
    id: 'user',
    fetch: () => {
      return API.getUser();
    }
  });

  return {
    user
  };
};
