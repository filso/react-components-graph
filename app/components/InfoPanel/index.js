import React from 'react';

export default class InfoPanel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div class="info-panel-wrapper" ng-include="'scripts/infoPanel/infoPanel.html'"></div>
    );
  }
}
