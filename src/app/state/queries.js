import React from 'react';
import { t } from 'revenge';

export const QueriesContextTypes = {
  avenger: React.PropTypes.object
};

export default function queries(_ids: t.String|Array<t.String>) {
  const ids = t.Arr.is(_ids) ? _ids : [_ids];
  return Component => {
    return class QueriesWrapper extends React.Component {
      static contextTypes = QueriesContextTypes;

      constructor(props) {
        super(props);
        this.state = { readyState: {} };
      }

      componentDidMount() {
        console.log(`>>>> ${Component.name} adding qs`, ids);
        this._subscription = this.context.avenger.addQueries(ids).subscribe(vAndRs => {
          this.setState(vAndRs); // eslint-disable-line react/no-did-mount-set-state
        });
      }

      componentWillUnmount() {
        this.context.avenger.removeQueries(ids);
        this._subscription.unsubscribe();
      }

      render() {
        return <Component {...this.props} {...this.state}/>;
      }
    };
  };
}
