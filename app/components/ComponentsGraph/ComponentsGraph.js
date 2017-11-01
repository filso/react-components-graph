import React from 'react';
import Graph from 'Graph';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    );
  }
}
