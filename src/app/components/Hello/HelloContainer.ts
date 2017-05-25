import container from 'container';
import Hello from './Hello';
import { TransitionFunction } from 'state';

type MapProps = {
  transition: TransitionFunction,
  formal?: boolean
};

export default container(Hello)({
  connect: ['formal'],
  mapProps: ({ transition, formal = false }: MapProps) => ({
    toggle: () => {
      transition({ formal: !formal });
    },
    formal
  })
}) as any as React.ComponentType;
