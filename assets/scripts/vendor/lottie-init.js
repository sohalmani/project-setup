(function () {
  var lottieAnimation = document.getElementsByClassName('lottie'),
    lottieBox = document.getElementsByClassName('lottie-box'),
    lottieRegisteredAnim = [];

  // Set up lottie animations
  // Add index class to each lottie element
  // Register each lottie animation
  // Create a waypoint to trigger the animation
  function preLoadAnim() {
    for (var i = 0; i < lottieAnimation.length; i++) {
      lottieAnimation[i].classList.add(i);
      lottieRegisteredAnim.push(lottie.registerAnimation(lottieAnimation[i]));
      var waypoint = new Waypoint({
        element: lottieAnimation[i],
        handler: function (direction) {
          // Only trigger play if element is hidden
          if (this.element.style.visibility != 'visible') {
            // Array index to play is the last class added to the element
            var animIndex = this.element.classList.length - 1;
            playAnimations(this.element.classList[animIndex]);
          }
        },
        // View offset from top for scrolling to trigger animation
        offset: '85%',
      });
    }
  }

  // Get the data-loop-frame attribute and duration
  // Play the first segment, and then keep playing
  // from the loop segment after that
  // @param arrayPos (int) index of the animation to play
  function playAnimations(arrayPos) {
    var loopFrame = parseInt(lottieAnimation[arrayPos].getAttribute('data-loop-frame')) || 1,
      animDelay = parseFloat(lottieAnimation[arrayPos].getAttribute('data-delay') * 1000) || 0,
      thisDuration;
    // Make sure animation duration is defined before playing
    var interval = setInterval(function () {
      thisDuration = lottieRegisteredAnim[arrayPos].getDuration(true);
      if (thisDuration > 0) {
        clearInterval(interval);
        setTimeout(function () {
          lottieAnimation[arrayPos].style.visibility = 'visible';
          if (lottieBox[arrayPos] !== undefined) {
            lottieBox[arrayPos].style.visibility = 'visible';
            lottieBox[arrayPos].classList.add('reveal-anim');
          }
          lottieRegisteredAnim[arrayPos].playSegments(
            [
              [0, loopFrame],
              [loopFrame + 1, thisDuration],
            ],
            true
          );
        }, animDelay);
      } else {
        clearInterval(interval);
        setTimeout(function () {
          lottieAnimation[arrayPos].style.visibility = 'visible';
          if (lottieBox[arrayPos] !== undefined) {
            lottieBox[arrayPos].style.visibility = 'visible';
            lottieBox[arrayPos].classList.add('reveal-anim');
          }
        }, animDelay);
      }
    }, 1000);
  }

  window.addEventListener('load', function () {
    preLoadAnim();
  });
})();
