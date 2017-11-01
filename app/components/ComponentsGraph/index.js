import React from 'react';
import Graph from './Graph';

export default class ComponentsGraph extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="dg-graph">
        <div class="controls">
          <div class="search" dg-search-node="">
            <label for="search-input">Search:</label>
            <input id="search-input" type="text" ng-model="text"></input>
          </div>
          <div class="choose-scope">
            <div ng-click="currentView.scope = 'modules'" ng-class="{active: currentView.scope === 'modules'}">Modules
            </div>
            <div ng-click="currentView.scope = 'components'" ng-class="{active: currentView.scope === 'components'}">Components</div>
          </div>
        </div>
        <a class="reset-tour" ng-click="main.startTour()" ng-if="!main.isTourActive()">Tutorial</a>
        <a class="disable-graph" ng-click="app.insertCookieAndRefresh('')">Disable graph</a>
        <div class="legend">
          <div class="mouse-instructions">
            <div>Mouse wheel - zoom</div>
            <div>Mouse drag - move</div>
          </div>
          <div class="trigger-components" ng-controller="TriggerComponentsCtrl" ng-include="'scripts/triggerComponents/triggerComponents.html'">
          </div>
        </div>
      </div>
    );
  }
}
