import container from 'container';
import Hello from './Hello';
import { TransitionFunction } from 'state';
import { noLoaderLoading } from 'react-avenger/lib/loading';

type MapProps = {
  transition: TransitionFunction,
  formal?: boolean,
  user: string
};

export default container(noLoaderLoading(Hello))({
  connect: ['formal'],
  queries: ['user'],
  mapProps: ({ transition, formal = false, user }: MapProps) => ({
    toggle: () => {
      transition({ formal: !formal });
    },
    formal,
    user
  })
}) as any as React.ComponentType;
