/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import messages from './messages';
import ComponentsGraph from '../../components/ComponentsGraph';
import Graph from '../../models/Graph';
import InspectedApp from '../../models/InspectedApp';

export default class Main extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  init(isTheSameApp) {

    let inspectedApp = new InspectedApp();
    inspectedApp.loadSampleData();
    let rawData = inspectedApp.getData();

    let allComponents = [];
    _.each(rawData.modules, function(module) {
      allComponents = allComponents.concat(module.components);
    });

    // Note: if it's the same app, then just update old graph
    let componentsGraph = Graph.createFromRawNodes(allComponents, isTheSameApp ? componentsGraph : undefined);
    currentView.setGraphs(componentsGraph);
    currentView.applyFilters();
    this.setState({ currentView });
  }

  componentWillMount() {
    this.init(false);
  }

  render() {
    return (
      <div className="main">
        <ComponentsGraph currentView={this.state.currentView}/>
      </div>
    );
  }
}
