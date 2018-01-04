import { Command } from 'avenger/lib/graph';
import queries from 'queries';

export const doRefreshUser = Command({
  id: 'doRefreshUser',
  invalidates: { user: queries.user },
  run: Promise.resolve.bind(Promise)
});

import qs from 'qs';

export const doUpdateFormal = Command({
  id: 'doUpdateFormal',
  invalidates: { formal: queries.formal },
  run: ({ formal }) => new Promise(resolve => {
    const formalQS = formal ? `?${qs.stringify({ formal })}` : '';
    const path = `${window.location.pathname}${formalQS}`;
    setTimeout(resolve);
    window.history.pushState(null, '', path);
  })
});
