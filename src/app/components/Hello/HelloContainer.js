import { fillFlexLoading, containerFactory } from 'Basic';
import Hello from './Hello';

const HelloContainer = containerFactory(Hello, {
  loadingDecorator: fillFlexLoading,
  queries: ['user']
});

export default HelloContainer(({ user: { name } }) => ({ username: name }));
