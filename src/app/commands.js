import { Command } from 'avenger/lib/graph';
import queries from 'queries';

export const doRefreshUser = Command({
  id: 'doRefreshUser',
  invalidates: { user: queries.user },
  run: ::Promise.resolve
});
