(function() {
  "use strict";
  var Queue = function Queue() {
    this.items = [];
  };
  Queue.prototype.enqueue = function enqueue(element) {
    return this.items.push(element);
  };
  Queue.prototype.dequeue = function dequeue() {
    if (this.items.length > 0) {
      return this.items.shift();
    }
  };
  Queue.prototype.peek = function peek() {
    return this.items[this.items.length - 1];
  };
  Queue.prototype.isEmpty = function isEmpty() {
    return this.items.length == 0;
  };
  Queue.prototype.size = function size() {
    return this.items.length;
  };
  Queue.prototype.clear = function clear() {
    this.items = [];
  };
  var Stack = function Stack() {
    this.items = [];
  };
  Stack.prototype.add = function add(element) {
    return this.items.push(element);
  };
  Stack.prototype.remove = function remove() {
    if (this.items.length > 0) {
      return this.items.pop();
    }
  };
  Stack.prototype.peek = function peek() {
    return this.items[this.items.length - 1];
  };
  Stack.prototype.isEmpty = function isEmpty() {
    return this.items.length == 0;
  };
  Stack.prototype.size = function size() {
    return this.items.length;
  };
  Stack.prototype.clear = function clear() {
    this.items = [];
  };
  var queue = new Queue();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(4);
  queue.enqueue(8);
  console.log(queue.items);
  queue.dequeue();
  console.log(queue.items);
  console.log(queue.peek());
  console.log(queue.isEmpty());
  console.log(queue.size());
  queue.clear();
  console.log(queue.items);
  var stack = new Stack();
  stack.add(1);
  stack.add(2);
  stack.add(4);
  stack.add(8);
  console.log(stack.items);
  stack.remove();
  console.log(stack.items);
  console.log(stack.peek());
})();
//# sourceMappingURL=index.js.map
