import * as React from 'react'
import { declareQueries } from 'container';

const queries = declareQueries(['authenticatedNumber']);

type Props = {
  id: number,
  authenticatedNumber?: number,
  readyState: any // TODO:
}

class Another extends React.Component<Props> {

  render() {
    const { id, authenticatedNumber, readyState } = this.props;
    const label = (() => {
      if (readyState.authenticatedNumber.loading) {
        return `loading authenticated number for ${id}...`;
      } else if (typeof authenticatedNumber === 'number') {
        return `authenticated number for ${id} is: ${authenticatedNumber}`;
      } else {
        return `can't load authenticated number for ${id}`;
      }
    })()

    return <div>{label}</div>
  }
}

export default queries(Another);
