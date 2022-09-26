(function ($) {
  //Accordian functionality
  var accordionHead = '.accordion-head';

  if ($(accordionHead).length > 0) {
    $(accordionHead).on('click', function () {
      var accordion = $(this).closest('.accordion');
      var accordionBody = $(this).siblings('.accordion-body');
      var accordionItems = $(accordionBody).find('li');
      var countActiveItems = $(accordionItems).parent().find('li.active').length;

      $(accordion).toggleClass('collapsed');

      if (
        $(accordion).hasClass('accordion--filter') &&
        $(accordionItems).length &&
        countActiveItems > 0 &&
        countActiveItems < accordionItems.length
      ) {
        if ($(accordion).hasClass('collapsed')) {
          $(accordionItems).not('.active').slideUp(400);
          $(accordionBody).find('.btn-wrap').slideUp(400);
        } else {
          $(accordionItems).slideDown(400);
          $(accordionBody).find('.btn-wrap').slideDown(400);
        }
      } else {
        $(accordionBody).slideToggle();
      }
    });
  }
})(jQuery);
