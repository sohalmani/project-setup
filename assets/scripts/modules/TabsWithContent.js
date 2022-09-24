define(function () {
  const TabsWithContent = (function () {
    const $tabsWithConetnt = $('.tabs-with-content');
    const $tabItem = $tabsWithConetnt.find('.tabs__nav li');
    const $tabContent = $tabsWithConetnt.find('.tab-content');

    const addTabId = function (elements, attribute = 'data-tab') {
      elements.each(function (i, element) {
        element.setAttribute(attribute, 'tab' + (i + 1));
      });
    };

    const addActiveOnTabContent = function (tabId) {
      $tabContent.removeClass('active');
      $('.tab-content[tab-id="' + tabId + '"]').addClass('active');
    };

    const firstTabShow = function () {
      $tabsWithConetnt.find('.tabs__nav li:first').addClass('active');
      $tabsWithConetnt.find('.tab-content:first').addClass('active');
    };

    const truncateLines = function () {
      const textWrapper = document.querySelector('.tabs-with-content .content-wrap');
      let options = {
        ellipsis: ' \u2026 ',
        height: 200,
        truncate: "word",
      };

      let dot = $(textWrapper).dotdotdot(options);
    };

    const init = function () {
      if (!$tabsWithConetnt.length) return;

      addTabId($tabItem);
      addTabId($tabContent, 'tab-id');
      firstTabShow();
      truncateLines();

      $tabItem.each(function (i, element) {
        $(this).on('click', function (e) {
          const tabId = $(this).attr('data-tab');

          $tabItem.removeClass('active');
          $(this).addClass('active');

          addActiveOnTabContent(tabId);
        });
      });
    };

    return {
      init: init,
    };
  })();

  return TabsWithContent;
});
