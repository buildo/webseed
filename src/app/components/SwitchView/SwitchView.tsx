import * as React from 'react';
import { declareQueries } from 'container';

type View = { view: string }
type Children<V extends View> = {
  [k in V['view']]: (v: V) => JSX.Element | null
}
type Props<V extends View> = {
  view: V,
  children: Children<V>
}

export default function makeSwitchView<V extends View>(viewQuery: string) {
  class SwitchView extends React.Component<Props<V>> {
    render() {
      const view = this.props.view;

      if (!view) {
        return null;
      }

      return this.props.children[view.view](view);
    }
  }
  return declareQueries([viewQuery])(SwitchView) as React.ComponentType<{ children: Children<V> }>;
}
