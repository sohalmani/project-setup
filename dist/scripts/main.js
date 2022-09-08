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

    const initSlider = function() {
      if(testimionial.length === 0) return;
     
      testimionial.each(function() {
        const slides = $(this).find('.testimonial-card').length;
        const wrapper = $(this).find('.testimonial__items'); 

        if (slides > 1) {
          wrapper.slick();  
        }
      });
    }

    const addEventhandler = function(handler) {
      ['load', 'resize'].forEach(ev => window.addEventListener(ev, handler));
    }

    return {
      initSlider: initSlider,
      addHandler : addEventhandler, 
    };
  })();

  return Slider;
});



define('modules/VideoOverlay',[],function() {
  const VideoOverlay = (function() {
    const playButton = $('.video-play-button');

    const init = function() {

      playButton.each(function() {
        $(this).on('click', function(e) {
          e.preventDefault();
          const videoSrc = $(this).attr('href');
          const videoId = videoSrc.split("v=")[1];

          console.log('test', videoId);
        });
      })
    }

    return {
      $init: init,
    }
  })();

  return VideoOverlay;
});
require(['modules/Car', 'modules/Slider', 'modules/VideoOverlay'], function(Car, Slider, VideoOverlay) {

  // Slider.$initSlider();
  Slider.addHandler(Slider.initSlider())
  VideoOverlay.$init();
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
