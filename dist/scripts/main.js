"use strict";

(function() {
  "use strict";
  var Slider = function() {
    var $testimionial = $(".testimonial");
    var initSlider = function initSlider() {
      if ($testimionial.length === 0) return;
      $testimionial.each(function() {
        var slides = $(this).find(".testimonial-card").length;
        var wrapper = $(this).find(".testimonial__items");
        if (slides > 1) {
          wrapper.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true
          });
        }
      });
    };
    var addEventhandler = function addEventhandler(handler) {
      [ "load", "resize" ].forEach(function(ev) {
        return window.addEventListener(ev, handler);
      });
    };
    return {
      initSlider: initSlider,
      addHandler: addEventhandler
    };
  }();
  var VideoOverlay = function() {
    var $playButton = $(".video-play-button");
    var $overlayElement = $(".video-overlay");
    var videoId;
    var ampersandPosition;
    var extractVideoUrl = function extractVideoUrl(url) {
      if (url === "") return;
      if (url.indexOf("watch") > 0) {
        videoId = url.split("v=")[1];
        ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition != -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
        return "https://youtube.com/embed/" + videoId;
      }
      if (url.indexOf("youtu.be") > 0) {
        videoId = url.split("e/")[1];
        ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition != -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
        return "https://youtube.com/embed/" + videoId;
      }
    };
    var overleyOpen = function overleyOpen(videoUrl) {
      if ($overlayElement.length === 0) return;
      $overlayElement.find("iframe").attr("src", videoUrl);
      $overlayElement.addClass("active");
    };
    var closeOverlay = function closeOverlay(e) {
      var clickedElement = e.target;
      if ($(clickedElement).hasClass("video-overlay") || $(clickedElement).hasClass("close") || $(clickedElement).hasClass("video-wrap") || $(clickedElement).hasClass("container")) {
        $(".video-overlay").removeClass("active");
        $(".video-overlay iframe").attr("src", "");
      } else if (e.key == "Escape") {
        $(".video-overlay").removeClass("active");
        $(".video-overlay iframe").attr("src", "");
      }
    };
    var setVideoBoxDimesnions = function setVideoBoxDimesnions() {
      if ($overlayElement.find(".video-wrap").length) {
        var videoBoxWidth = $overlayElement.find(".container").width();
        var videoBoxHeight = videoBoxWidth / 16 * 9;
        if (videoBoxHeight + 100 > $(window).height()) {
          videoBoxHeight = $overlayElement.height();
          videoBoxWidth = videoBoxHeight / 9 * 16;
        }
        $overlayElement.find(".video-wrap").css({
          width: videoBoxWidth + "px",
          height: videoBoxHeight + "px"
        });
        var windowWidth = $(window).width();
        if (windowWidth >= 1200) {
          if ($(window).height() >= 776) {
            $overlayElement.find(".video-wrap").css({
              height: "620px"
            });
          }
        }
      }
    };
    var init = function init() {
      $playButton.each(function() {
        $(this).on("click", function(e) {
          e.preventDefault();
          var videoSrc = $(this).attr("href");
          overleyOpen(extractVideoUrl(videoSrc));
        });
      });
      $(window).on("load resize", setVideoBoxDimesnions);
      $(document).on("click", closeOverlay);
    };
    return {
      init: init
    };
  }();
  var ContentInAccordion = function() {
    var $contentInAccordion = $(".content-in-accordion");
    var $panelGroup = $contentInAccordion.find(".panel-group");
    var firstPanelOpen = function firstPanelOpen() {
      $(".content-in-accordion .panel:first .panel__body").show();
      $(".content-in-accordion .panel:first .panel__heading").addClass("open");
    };
    var init = function init() {
      if ($contentInAccordion.length) {
        firstPanelOpen();
        $panelGroup.on("click", function(e) {
          e.preventDefault();
          var clickedElement = e.target;
          $(clickedElement).closest(".panel").find(".panel__heading").addClass("open");
          $(clickedElement).closest(".panel").find(".panel__body").toggleClass("open").slideToggle();
        });
      }
    };
    return {
      init: init
    };
  }();
  var TabsWithContent = function() {
    var $tabsWithConetnt = $(".tabs-with-content");
    var $tabItem = $tabsWithConetnt.find(".tabs__nav li");
    var $tabContent = $tabsWithConetnt.find(".tab-content");
    var addTabId = function addTabId(elements) {
      var attribute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "data-tab";
      elements.each(function(i, element) {
        element.setAttribute(attribute, "tab" + (i + 1));
      });
    };
    var addActiveOnTabContent = function addActiveOnTabContent(tabId) {
      $tabContent.removeClass("active");
      $('.tab-content[tab-id="' + tabId + '"]').addClass("active");
    };
    var firstTabShow = function firstTabShow() {
      $tabsWithConetnt.find(".tabs__nav li:first").addClass("active");
      $tabsWithConetnt.find(".tab-content:first").addClass("active");
    };
    var truncateLines = function truncateLines() {
      var textWrapper = document.querySelector(".tabs-with-content .content-wrap");
      var options = {
        ellipsis: " … ",
        height: 200,
        truncate: "word"
      };
      var dot = $(textWrapper).dotdotdot(options);
    };
    var init = function init() {
      if (!$tabsWithConetnt.length) return;
      addTabId($tabItem);
      addTabId($tabContent, "tab-id");
      firstTabShow();
      truncateLines();
      $tabItem.each(function(i, element) {
        $(this).on("click", function(e) {
          var tabId = $(this).attr("data-tab");
          $tabItem.removeClass("active");
          $(this).addClass("active");
          addActiveOnTabContent(tabId);
        });
      });
    };
    return {
      init: init
    };
  }();
  var CardsWithIcon = function() {
    var $cardsBlade = $(".cards-with-icon");
    var $cardTitle = $(".cards-with-icon .card .card__title");
    var triggerMatchHeight = function triggerMatchHeight(element) {
      $cardsBlade.each(function() {
        $(this).find(element).matchHeight();
      });
    };
    var init = function init() {
      if (!$cardsBlade.length) return;
      $(window).on("load, resize", triggerMatchHeight($cardTitle));
    };
    return {
      init: init
    };
  }();
  Slider.addHandler(Slider.initSlider());
  VideoOverlay.init();
  ContentInAccordion.init();
  TabsWithContent.init();
  CardsWithIcon.init();
})();
//# sourceMappingURL=main.js.map
