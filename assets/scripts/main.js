require(['modules/Slider', 'modules/VideoOverlay', 'modules/ContentInAccordion', 'modules/TabsWithContent', 'modules/CardsWithIcon'], function(Slider, VideoOverlay, ContentInAccordion, TabsWithContent, CardsWithIcon) {

  Slider.addHandler(Slider.initSlider())
  VideoOverlay.init();
  ContentInAccordion.init();
  TabsWithContent.init();
  CardsWithIcon.init();
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
