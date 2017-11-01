import * as _ from 'lodash';

export default class CurrentView {
  selectedNode = undefined;

  setGraph(componentsGraph) {
    this.componentsGraph = componentsGraph;
  }

  chooseNode(node, translate) {
    this.selectedNode = node;
  }

  applyFilters = _.throttle(function() {
    this._applyFilters();
  }, 200);

  _applyFilters() {
    if (!this.componentsGraph) {
      return; // not initialised
    }

    this.graph = this.componentsGraph;
    this.componentsGraph.resetFilter();

    if (this.filters.componentsVisible ) {
      this.componentsGraph.filterNodes(function(node) {
        var val = this.filters.componentsVisible[node.type];
        return val === true;
      });
    }

    // Now filter all components of excluded modules
    this.componentsGraph.filterNodes((node) => {
      return (this.modulesGraph.nodes.indexOf(node.module) !== -1);
    });
  }
}