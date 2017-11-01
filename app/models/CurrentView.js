import * as _ from 'lodash';

class CurrentView {
  selectedNode = undefined;

  scope = Const.Scope.MODULES;

  setGraph(componentsGraph) {
      this.componentsGraph = componentsGraph;
  }

  chooseNode(node, translate) {
    if (node.isModule === true) {
      this.setScope(Const.Scope.MODULES);
    } else {
      this.setScope(Const.Scope.COMPONENTS);
    }

    this.selectedNode = node;
  }

  applyFilters = _.throttle(function() {
    service._applyFilters();
  }, 200);

  _applyFilters() {
    if (!this.componentsGraph) {
      return; // not initialised
    }

    this.graph = this.componentsGraph;

    var masks;
    this.componentsGraph.resetFilter();
    this.modulesGraph.resetFilter();

    if (this.filters.componentsVisible ) {
      this.componentsGraph.filterNodes(function(node) {
        var val = service.filters.componentsVisible[node.type];
        return val === true;
      });
    }

    // Now filter all components of excluded modules
    this.componentsGraph.filterNodes(function(node) {
      return (service.modulesGraph.nodes.indexOf(node.module) !== -1);
    });
  }
}