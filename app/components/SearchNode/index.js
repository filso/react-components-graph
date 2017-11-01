import React from 'react';
import PropTypes from 'prop-types';

export default class SearchNode extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="search">
        <label htmlFor="search-input">Search:</label>
        <input id="search-input" type="text"></input>
      </div>
    );
  }
}

SearchNode.propTypes = {
};
