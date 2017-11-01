export default function Graph(nodes, links) {
  this.origNodes = this.nodes = nodes;
  this.origLinks = this.links = links;
}

let createNodes = (rawNodes, oldGraph) => {
  var nodes = [];
  var links = [];

  _.each(rawNodes, function(rawNode) {
    var node;
    if (oldGraph) {
      node = _.find(oldGraph.nodes, {name: rawNode.name});
    }

    if (node === undefined) {
      if (rawNode.type === 'module') {
        node = new Module(rawNode);
      } else {
        node = new Component(rawNode);
      }
    }
    nodes.push(node);
  });

  // TODO(filip): Not reusing links at this time... Do I need to do that? D3 force layout doesn't seem to care
  _.each(nodes, function(node) {
    node.resetLinks();
  });

  _.each(nodes, function(node1) {

    var node1Deps = _.filter(nodes, function(item) {
      return _.contains(node1._data.deps, item._data.name);
    });

    _.each(node1Deps, function(node2) {
      node1.linkDep(node2);
      node2.linkProvides(node1);
      links.push({target: node1, source: node2, _id: _.uniqueId()});
    });

  });

  return {
    nodes: nodes,
    links: links
  };
};

Graph.createFromRawNodes = function(rawNodes, oldGraph) {

  var obj = createNodes(rawNodes, oldGraph);
  var nodes = obj.nodes;
  var links = obj.links;

  return new Graph(nodes, links);
};

Graph.prototype.filterNodes = function(fn) {
  var nodes = this.nodes = _.filter(this.nodes, fn);
  this.links = _.filter(this.links, function(l) {
    return nodes.indexOf(l.target) !== -1 && nodes.indexOf(l.source) !== -1;
  });
};

Graph.prototype.resetFilter = function() {
  this.nodes = this.origNodes;
  this.links = this.origLinks;
};

Graph.prototype.filterByName = function(name) {
  var nameLow = name.toLowerCase();
  this.filterNodes(function(node) {
    return node.name.toLowerCase().indexOf(nameLow) !== -1;
  });

};