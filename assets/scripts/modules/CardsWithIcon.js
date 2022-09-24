
define(function () {
  const CardsWithIcon = (function () {
    const $cardsBlade = $('.cards-with-icon');
    
    const init = function () {
      if($cardsBlade.length) {
        console.log('Test');
      }
    }

    return {
      init: init,
    }

  })();

  return CardsWithIcon;
});