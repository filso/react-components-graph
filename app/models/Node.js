import * as _ from 'lodash';

export default class Node {
  constructor(_data) {
    this._id = _.uniqueId();
    this.name = _data.name;
    this._data = _data;
    this.type = _data.type;
    this.deps = [];
    this.provides = [];
  }

  linkDep(node) {
    this.deps.push(node);
  }

  linkProvides(node) {
    this.provides.push(node);
  }

  resetLinks() {
    this.deps = [];
    this.provides = [];
  }
}