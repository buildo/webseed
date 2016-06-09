import { Command } from 'avenger';
import queries from 'queries';

const commands = {

  doRefreshUser: Command({
    id: 'doRefreshUser',
    invalidates: { user: queries.user },
    run: ::Promise.resolve
  })

};

export default commands;
