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

export default class Main extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div ng-controller="MainCtrl as main" class="main">
        <div dg-graph class="dg-graph" ng-if="currentView.graph">
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
        <div class="info-panel-wrapper" ng-include="'scripts/infoPanel/infoPanel.html'">
        </div>

      </div>
    );
  }
}
