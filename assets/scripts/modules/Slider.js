define(function() {
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


