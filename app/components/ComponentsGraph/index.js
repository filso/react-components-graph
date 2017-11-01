import React from 'react';
import PropTypes from 'prop-types';

import Graph from './Graph';
import SearchNode from '../SearchNode';

export default class ComponentsGraph extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="dg-graph">
        <div className="controls">
          <SearchNode />

        </div>
        <a className="reset-tour" onClick={this.props.startTour}>Tutorial</a>
        <a className="disable-graph" onClick={this.props.insertCookieAndRefresh}>Disable graph</a>
        <div className="legend">
          <div className="mouse-instructions">
            <div>Mouse wheel - zoom</div>
            <div>Mouse drag - move</div>
          </div>
        </div>
      </div>
    );
  }
}


ComponentsGraph.propTypes = {
  startTour: PropTypes.func,
  insertCookieAndRefresh: PropTypes.func
};
