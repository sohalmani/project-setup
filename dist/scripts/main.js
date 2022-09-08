define('modules/Person',{
    name: "John Doe",
});

define('modules/Car',["./Person"], function (Person) {
    function Car() {
        this.getOwner = function () {
            return "The owner is " + Person.name;
        };
    }
    return Car;
});

define('modules/Slider',[],function() {
  const Slider = (function() {
    const testimionial = $('.testimonial');
    const init = function() {
      const wrapper = testimionial.find('.testimonial__items');
      
      wrapper.slick();
    }
    return {
      $testimonial: testimionial,
      $init: init,
    };
  })();

  return Slider;
});

require(['modules/Car', 'modules/Slider'], function(Car, Slider) {
  // const car = new Car();

  console.log(Slider.$init());
  // console.log(car.getOwner());
 });


// import Queue from './modules/Queue';
// import Stack from './modules/Stack';

// let queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(4);
// queue.enqueue(8);
// console.log(queue.items);

// queue.dequeue();
// console.log(queue.items);

// console.log(queue.peek());

// console.log(queue.isEmpty());

// console.log(queue.size());

// queue.clear();
// console.log(queue.items);

// let stack = new Stack();
// stack.add(1);
// stack.add(2);
// stack.add(4);
// stack.add(8);
// console.log(stack.items);

// stack.remove();
// console.log(stack.items);

// console.log(stack.peek());

define("main", function(){});


//# sourceMappingURL=main.js.map
