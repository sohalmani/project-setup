(function () {
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
})();
