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



define('modules/VideoOverlay',[],function () {
  const VideoOverlay = (function () {
    const playButton = $('.video-play-button');
    const overlayElement = $('.video-overlay');
    var videoId;
    var ampersandPosition;

    const extractVideoUrl = function (url) {
      if (url === '') return;

      if (url.indexOf('watch') > 0) {
        videoId = url.split('v=')[1];
        ampersandPosition = videoId.indexOf('&');

        if (ampersandPosition != -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
        return (videoUrl = 'https://youtube.com/embed/' + videoId);
      }

      if (url.indexOf('youtu.be') > 0) {
        videoId = url.split('e/')[1];
        ampersandPosition = videoId.indexOf('&');

        if (ampersandPosition != -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }

        return (url = 'https://youtube.com/embed/' + videoId);
      }
    };

    const overleyOpen = function (videoUrl) {
      if (overlayElement.length === 0) return;

      overlayElement.find('iframe').attr('src', videoUrl);
      overlayElement.addClass('active');
    };

    const closeOverlay = function (e) {
      var clickedElement = e.target;

      if (
        $(clickedElement).hasClass('video-overlay') ||
        $(clickedElement).hasClass('close') ||
        $(clickedElement).hasClass('video-wrap') ||
        $(clickedElement).hasClass('container')
      ) {
        $('.video-overlay').removeClass('active');
        $('.video-overlay iframe').attr('src', '');
      } else if (e.key == 'Escape') {
        $('.video-overlay').removeClass('active');
        $('.video-overlay iframe').attr('src', '');
      }
    };

    const setVideoBoxDimesnions = function () {
      if (overlayElement.find('.video-wrap').length) {
        var videoBoxWidth = overlayElement.find('.container').width();
        var videoBoxHeight = (videoBoxWidth / 16) * 9;

        if (videoBoxHeight + 100 > $(window).height()) {
          videoBoxHeight = overlayElement.height();
          videoBoxWidth = (videoBoxHeight / 9) * 16;
        }

        overlayElement.find('.video-wrap').css({
          width: videoBoxWidth + 'px',
          height: videoBoxHeight + 'px',
        });

        var windowWidth = $(window).width();
        if (windowWidth >= 1200) {
          if ($(window).height() >= 776) {
            overlayElement.find('.video-wrap').css({ height: '620px' });
          }
        }
      }
    }

    const init = function () {
      playButton.each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();

          const videoSrc = $(this).attr('href');

          overleyOpen(extractVideoUrl(videoSrc));
        });
      });

      $(window).on('load resize', setVideoBoxDimesnions);
      $(document).on('click', closeOverlay);
    };

    return {
      $init: init,
    };
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
