define(function () {
  const TabsWithContent = (function () {
    const $tabsWithConetnt = $('.tabs-with-content');
    const $tabItem = $tabsWithConetnt.find('.tabs-nav li');
    const $tabContent = $tabsWithConetnt.find('.tab-content');

    const addIds = function (elements, attribute = 'data-tab') {
      elements.each(function (i, element) {
        element.setAttribute(attribute, "tab" + (i + 1));
      });
    }

    const init = function () {
      if (!$tabsWithConetnt.length) return;
      
      addIds($tabItem);
      addIds($tabContent, "tab-id");
    }

    return {
      init: init,
    }
  })();

  return TabsWithContent;
});