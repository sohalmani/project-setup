define(function() {
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
