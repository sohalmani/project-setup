(function () {
  const circleAnimationsWithFigure = document.querySelectorAll('.circle-animations-with-figure');

  if (circleAnimationsWithFigure) {
    var circleLottieAnimations = document.getElementsByClassName('lottie-circle'),
    lottieRegisteredAnim = [];

    /**
     * Set up lottie animation
     * -----------------------
     * Add index class to each lottie element
     * Register each lottie animation
     * Create a waypoint to trigger the animation
     */
    function preLoadAnim() {
      for (var i = 0; i < circleLottieAnimations.length; i++) {
        circleLottieAnimations[i].classList.add(i);
        lottieRegisteredAnim.push(lottie.registerAnimation(circleLottieAnimations[i]));

        var waypoint = new Waypoint({
          element: circleLottieAnimations[i],
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

    /**
     * Get the data-loop-frame attribute and duration
     * Play the first segment, and then keep playing from the loop segment after that
     * @param arrayPos (int) index of the animation to play
     */
    function playAnimations(arrayPos) {
      var animDelay = parseFloat(circleLottieAnimations[arrayPos].getAttribute('data-delay') * 1000) || 0,
        loopFrame = parseInt(circleLottieAnimations[arrayPos].getAttribute('data-loop-frame')) || 1,
        thisDuration;

      // Make sure animation duration is defined before playing
      thisDuration = lottieRegisteredAnim[arrayPos].getDuration(true);

      if (thisDuration > 0) {
        setTimeout(function () {
          circleLottieAnimations[arrayPos].style.visibility = 'visible';

          lottieRegisteredAnim[arrayPos].playSegments(
            [
              [0, loopFrame],
              [loopFrame + 1, thisDuration],
            ],
            true
          );
        }, animDelay);
      } else {
        setTimeout(function () {
          circleLottieAnimations[arrayPos].style.visibility = 'visible';
        }, animDelay);
      }
    }

    window.addEventListener('load', function () {
      preLoadAnim();
    });
  }
})();