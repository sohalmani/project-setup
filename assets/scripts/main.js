define(['modules/Slider', 'modules/VideoOverlay', 'modules/ContentInAccordion', 'modules/TabsWithContent', 'modules/CardsWithIcon'], function(Slider, VideoOverlay, ContentInAccordion, TabsWithContent, CardsWithIcon) {

  Slider.addHandler(Slider.initSlider())
  VideoOverlay.init();
  ContentInAccordion.init();
  TabsWithContent.init();
  CardsWithIcon.init();
});
