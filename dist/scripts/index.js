"use strict";

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function() {
  "use strict";
  var Queue = function() {
    function Queue() {
      _classCallCheck(this, Queue);
      this.items = [];
    }
    _createClass(Queue, [ {
      key: "enqueue",
      value: function enqueue(element) {
        return this.items.push(element);
      }
    }, {
      key: "dequeue",
      value: function dequeue() {
        if (this.items.length > 0) {
          return this.items.shift();
        }
      }
    }, {
      key: "peek",
      value: function peek() {
        return this.items[this.items.length - 1];
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.items.length == 0;
      }
    }, {
      key: "size",
      value: function size() {
        return this.items.length;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items = [];
      }
    } ]);
    return Queue;
  }();
  var Stack = function() {
    function Stack() {
      _classCallCheck(this, Stack);
      this.items = [];
    }
    _createClass(Stack, [ {
      key: "add",
      value: function add(element) {
        return this.items.push(element);
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this.items.length > 0) {
          return this.items.pop();
        }
      }
    }, {
      key: "peek",
      value: function peek() {
        return this.items[this.items.length - 1];
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return this.items.length == 0;
      }
    }, {
      key: "size",
      value: function size() {
        return this.items.length;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items = [];
      }
    } ]);
    return Stack;
  }();
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
