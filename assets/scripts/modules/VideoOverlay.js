define(function() {
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