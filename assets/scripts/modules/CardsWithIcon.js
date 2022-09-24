
define(function () {
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