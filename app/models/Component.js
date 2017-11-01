import Node from './Node';

export default function Component(_data) {
  this.isModule = false;
  Node.apply(this, arguments);
}

Component.prototype = Object.create(Node.prototype);
