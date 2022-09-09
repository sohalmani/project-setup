define(function () {
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
