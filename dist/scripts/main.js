define('modules/Slider',[],function() {
  const Slider = (function() {
    const $testimionial = $('.testimonial');

    const initSlider = function() {
      if($testimionial.length === 0) return;
     
      $testimionial.each(function() {
        const slides = $(this).find('.testimonial-card').length;
        const wrapper = $(this).find('.testimonial__items'); 

        if (slides > 1) {
          wrapper.slick({
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: true,
            });  
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
    const $playButton = $('.video-play-button');
    const $overlayElement = $('.video-overlay');
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
        return 'https://youtube.com/embed/' + videoId;
      }

      if (url.indexOf('youtu.be') > 0) {
        videoId = url.split('e/')[1];
        ampersandPosition = videoId.indexOf('&');

        if (ampersandPosition != -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }

        return 'https://youtube.com/embed/' + videoId;
      }
    };

    const overleyOpen = function (videoUrl) {
      if ($overlayElement.length === 0) return;

      $overlayElement.find('iframe').attr('src', videoUrl);
      $overlayElement.addClass('active');
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
      if ($overlayElement.find('.video-wrap').length) {
        var videoBoxWidth = $overlayElement.find('.container').width();
        var videoBoxHeight = (videoBoxWidth / 16) * 9;

        if (videoBoxHeight + 100 > $(window).height()) {
          videoBoxHeight = $overlayElement.height();
          videoBoxWidth = (videoBoxHeight / 9) * 16;
        }

        $overlayElement.find('.video-wrap').css({
          width: videoBoxWidth + 'px',
          height: videoBoxHeight + 'px',
        });

        var windowWidth = $(window).width();
        if (windowWidth >= 1200) {
          if ($(window).height() >= 776) {
            $overlayElement.find('.video-wrap').css({ height: '620px' });
          }
        }
      }
    }

    const init = function () {
      $playButton.each(function () {
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
      init: init,
    };
  })();

  return VideoOverlay;
});

define('modules/ContentInAccordion',[],function () {
  const ContentInAccordion = (function () {
    const $contentInAccordion = $('.content-in-accordion');
    const $panelGroup = $contentInAccordion.find('.panel-group');

    const firstPanelOpen = function () {
      $('.content-in-accordion .panel:first .panel__body').show();
      $('.content-in-accordion .panel:first .panel__heading').addClass('open');
    }

    const init = function () {
      if ($contentInAccordion.length) {
        firstPanelOpen();

        $panelGroup.on('click', function(e) {
          e.preventDefault();
         
          const clickedElement = e.target;

          $(clickedElement).closest('.panel').find('.panel__heading').addClass('open');
          $(clickedElement).closest('.panel').find('.panel__body').toggleClass('open').slideToggle();
        });
      }
    }

    return {
      init: init,
    }
  })();

  return ContentInAccordion;
})
;
define('modules/TabsWithContent',[],function () {
  const TabsWithContent = (function () {
    const $tabsWithConetnt = $('.tabs-with-content');
    const $tabItem = $tabsWithConetnt.find('.tabs__nav li');
    const $tabContent = $tabsWithConetnt.find('.tab-content');

    const addTabId = function (elements, attribute = 'data-tab') {
      elements.each(function (i, element) {
        element.setAttribute(attribute, 'tab' + (i + 1));
      });
    };

    const addActiveOnTabContent = function (tabId) {
      $tabContent.removeClass('active');
      $('.tab-content[tab-id="' + tabId + '"]').addClass('active');
    };

    const firstTabShow = function () {
      $tabsWithConetnt.find('.tabs__nav li:first').addClass('active');
      $tabsWithConetnt.find('.tab-content:first').addClass('active');
    };

    const truncateLines = function () {
      const textWrapper = document.querySelector('.tabs-with-content .content-wrap');
      let options = {
        ellipsis: ' \u2026 ',
        height: 200,
        truncate: "word",
      };

      let dot = $(textWrapper).dotdotdot(options);
    };

    const init = function () {
      if (!$tabsWithConetnt.length) return;

      addTabId($tabItem);
      addTabId($tabContent, 'tab-id');
      firstTabShow();
      truncateLines();

      $tabItem.each(function (i, element) {
        $(this).on('click', function (e) {
          const tabId = $(this).attr('data-tab');

          $tabItem.removeClass('active');
          $(this).addClass('active');

          addActiveOnTabContent(tabId);
        });
      });
    };

    return {
      init: init,
    };
  })();

  return TabsWithContent;
});


define('modules/CardsWithIcon',[],function () {
  const CardsWithIcon = (function () {
    const $cardsBlade = $('.cards-with-icon');
    const $cardTitle = $('.cards-with-icon .card .card__title');

    const triggerMatchHeight = function (element) {
      $cardsBlade.each(function () {
        $(this).find(element).matchHeight();
      });
    }
    
    const init = function () {
      if(!$cardsBlade.length) return;

      $(window).on('load, resize', triggerMatchHeight($cardTitle));
    }

    return {
      init: init,
    }

  })();

  return CardsWithIcon;
});
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

define("main", function(){});


//# sourceMappingURL=main.js.map
