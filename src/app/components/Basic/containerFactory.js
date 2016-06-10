import React from 'react';
import pick from 'lodash/pick';
import compact from 'lodash/compact';
import flowRight from 'lodash/flowRight';
import { skinnable, pure } from 'revenge';
import { props, t } from 'tcomb-react';
import loading from 'react-avenger/loading';
import { contains } from 'Basic';
import declareQueries from 'declareQueries';
import declareConnect from 'declareConnect';
import declareCommands from 'declareCommands';

const argumentsTypes = t.struct({
  loadingDecorator: t.maybe(t.Function),
  connect: t.maybe(t.dict(t.String, t.Function)),
  queries: t.maybe(t.list(t.String)),
  commands: t.maybe(t.list(t.String))
});

const _containerFactory = (Component, {
  loadingDecorator = loading({}), connect, queries, commands
}) => {
  const declaredQueries = queries && declareQueries(queries);
  const declaredCommands = commands && declareCommands(commands);
  const declaredConnect = connect && declareConnect(connect);
  const loader = queries && loadingDecorator;
  const propsTypes = {
    ...(queries ? declaredQueries.Type : {}),
    ...(commands ? declaredCommands.Type : {}),
    ...(connect ? declaredConnect.Type : {})
  };
  const composedDecorators = flowRight(...compact([
    declaredQueries,
    declaredCommands,
    declaredConnect,
    loader
  ]));
  return (getComponentProps = (props) =>
          pick(props, [
            ...(queries || []),
            ...(commands || []),
            ...Object.keys(connect || {})
          ])) => (
    @composedDecorators
    @skinnable(contains(Component))
    @pure
    @props(propsTypes)
    class ContainerFactoryWrapper extends React.Component {
      static displayName = `${Component.displayName || Component.name || 'Component'}Container`;
      getLocals() { return getComponentProps(this.props); }
    }
  );

};

const containerFactory = t.func([t.Function, argumentsTypes], t.Function)
  .of(_containerFactory, true);

export default (Component, args) => containerFactory(Component, argumentsTypes(args));
