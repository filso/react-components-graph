import React from 'react';
import PropTypes from 'prop-types';

import Graph from '../../models/Graph';
import SearchNode from '../SearchNode';
import * as _ from 'lodash';

export default class ComponentsGraph extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    let elm = this.refs.graph;

    let update = () => {
      let currentView = this.props.currentView;
      // TODO(filip): profile this, this is run on every node select
      let currentGraph = currentView.graph;
      force.nodes(currentGraph.nodes)
        .links(currentGraph.links);

      links = svg.selectAll('.link')
        .data(force.links(), _.property('_id'));

      links.enter()
        .insert('line', ':first-child') // this needs to be rendered first -> prepend
        .attr('class', 'link')
        .attr('marker-end', 'url(#end)');
      links.exit().remove();

      nodes = svg.selectAll('.node')
        .data(force.nodes(), _.property('_id'));

      /**
       * Nodes enter
       */
      nodesEnter = nodes
        .enter()
        .append('g')
        .attr('class', _.property('type'))
        .classed('node', true)
        .on('mousedown', nodeClick)
        .on('dblclick', dblclick)
        .call(drag);

      nodesEnter.append('circle');

      nodesEnter.append('text')
        .attr('x', 12)
        .attr('dy', '.35em')
        .text(function(d) {
          return d.name;
        });

      /**
       * Nodes update
       */
      if (currentView.options.stickyNodesEnabled === false) {
        _.each(force.nodes(), function(node) {
            node.fixed = false;
        });
      }
      nodes
        .classed('selected', function(d) {
          return d === currentView.selectedNode;
        })
        .classed('fixed', function(d) {
          return d.fixed;
        });

      /**
       * Nodes remove
       */
      nodes.exit().remove();
      force.start();
    }


    function tick() {
      links
        .attr('x1', (d) => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodes
        .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
    }

    function nodeClick(d) {
      currentView.chooseNode(d);
    }

    function zoomListener() {
      let tmp = svg;

      // add transtion if user is not panning (move) or zooming (wheel)
      if (!d3.event.sourceEvent || ['mousemove', 'wheel'].indexOf(d3.event.sourceEvent.type) === -1) {
        tmp = tmp.transition();
      }
      tmp.attr('transform',
        'translate(' + d3.event.translate + ') ' +
        ' scale(' + d3.event.scale + ')');
    }

    // scope.$on(Const.Events.CHOOSE_NODE, function(event, d, translate) {
    //   if (force.nodes().indexOf(d) === -1) { // if d is not present, it's not visible
    //     return;
    //   }

    //   if (translate) {
    //     var scale = zoom.scale();
    //     var x = -(scale * d.x - width/2);
    //     var y = -(scale * d.y - height/2);

    //     zoom.translate([x, y]).event(svg);
    //   }
    //   update();

    // });

    var links, nodes, nodesEnter;

    var width = $(elm).width();
    var height = $(elm).height();

    var force = d3.layout.force()
      .size([width, height])
      .linkStrength(0.5)
      .friction(0.85)
      .linkDistance(100)
      .charge(-400)
      .gravity(0.05)
      // .linkDistance(120)
      // .charge(-800)
      .on('tick', tick);

    var drag = force.drag()
      .on("dragstart", dragstart);


    /**
     * Sticky nodes callbacks
     */
    function dblclick(d) {
      d3.select(this).classed('fixed', d.fixed = false);
      d3.event.stopImmediatePropagation();
    }

    function dragstart(d) {
      if (currentView.options.stickyNodesEnabled) {
        d3.select(this).classed('fixed', d.fixed = true);
      }
    }

    var zoom = d3.behavior.zoom()
      .scaleExtent([0.5 ,2])
      .on('zoom', zoomListener);

    var svg = d3.select(elm).append('svg')
      .on('mousedown', function() {
        // Allow moving only on svg element,
        // otherwise stop propagation to zoom behaviour
        if (d3.event.target.tagName !== 'svg') {
          d3.event.stopImmediatePropagation();
        }
      })
      .call(zoom)
      .append('g');


    /**
     * Definitions of markers
     */
    svg.append('svg:defs').selectAll('marker')
        .data(['end'])      // Different link/path types can be defined here
      .enter().append('svg:marker')    // This section adds in the arrows
        .attr('id', String)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 18)
        .attr('refY', 0)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('fill', '#eee')
        .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M0,-3L10,0L0,3');

    var debouncedUpdate = _.debounce(update, 100);
    // scope.$on(Const.Events.UPDATE_GRAPH, debouncedUpdate);
    debouncedUpdate();
  }


  render() {
    return (
      <div className="dg-graph" ref='graph'>
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
  currentView: PropTypes.object,
  startTour: PropTypes.func,
  insertCookieAndRefresh: PropTypes.func
};
