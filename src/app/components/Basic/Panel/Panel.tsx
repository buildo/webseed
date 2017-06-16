import * as React from 'react';
import { default as BRCPanel, PanelProps } from 'buildo-react-components/lib/Panel/Panel';
import { ObjectOmit } from 'typelevel-ts';

import './panel.scss';

type DefaultProps = {
  type: PanelProps['type']
};

type RequiredProps = ObjectOmit<PanelProps, keyof DefaultProps>;

type Props = Partial<DefaultProps> & RequiredProps;

const defaultProps: DefaultProps = {
  type: 'docked-top'
};

export default class Panel extends React.PureComponent<Props> {

  getProps() {
    return { ...defaultProps, ...this.props };
  }

  render() {
    return <BRCPanel {...this.getProps()} />;
  }

}
