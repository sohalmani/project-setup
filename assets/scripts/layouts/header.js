// (function ($) {
//   var navItems = 'header .main-nav nav > ul > li';
//   var $colThreeContent = $('header .services .col-three-content');

//   if ($(navItems).length) {
//     $(navItems).each(function () {
//       if ($(this).find('.dropdown-menu').length) {
//         $(this).addClass('with-dropdown');
//       }

//       if ($(this).find('.menu-tabs').length) {
//         $(this).addClass('has-menu-tabs');

//         var firstMenuLink = $(this).find('.menu-links').first();
//         var menuLinkWidth = $(firstMenuLink).innerWidth();
//         var dropdownOffsetLeft = (menuLinkWidth / 2) * -1 + 'px';

//         $(this).find('.menu-box').css('left', dropdownOffsetLeft);
//       }
//     });

//     $colThreeContent.each(function () {
//       if (this.childElementCount === 0) {
//         $(this).addClass('blank-element');
//       }
//     });
//   }

//   var navItemsWithDropdown = 'header .main-nav nav > ul > li.with-dropdown';

//   if ($(navItemsWithDropdown).length) {
//     $(navItemsWithDropdown).on({
//       mouseenter: function () {
//         if ($(window).width() > 991) {
//           $('body').addClass('stop-scroll');

//           $(this).siblings().removeClass('active-nav').find('.dropdown-menu.open').removeClass('open');
//           $(this).addClass('active-nav').find('.dropdown-menu').addClass('open');
//         }
//       },
//       mouseleave: function () {
//         $('body').removeClass('stop-scroll');
//         if ($(window).width() > 991) {
//           $(this).find('.menu-links ul li').removeClass('active');
//           $(this).removeClass('active-nav').find('.dropdown-menu').removeClass('open');

//           if ($(this).find('.menu-tabs').length) {
//             $(this).find('.menu-tabs').removeClass('show').find('.tab-panel').removeClass('active');

//             var firstMenuLink = $(this).find('.menu-links').first();
//             var menuLinkWidth = $(firstMenuLink).innerWidth();
//             var dropdownOffsetLeft = (menuLinkWidth / 2) * -1 + 'px';

//             $(this).find('.menu-box').css('left', dropdownOffsetLeft);

//             $('body').removeClass('stop-scroll');
//           }
//         }
//       },
//       click: function () {
//         if ($(window).width() <= 991) {
//           $('body').toggleClass('stop-scroll');
//           $(this).siblings().removeClass('active-nav ').find('.dropdown-menu.open').removeClass('open');
//           $(this).toggleClass('active-nav');
//           $(this).find('.dropdown-menu').toggleClass('open');
//           $(this).find('.dropdown-menu .menu-tabs').first().addClass('show');
//         }
//       },
//     });
//   }

//   //Active nav on load
//   var path = window.location.pathname;
//   $('header nav ul li a[href="' + path + '"]')
//     .parents('.with-dropdown')
//     .eq(0)
//     .addClass('active-menu');

//   //Click prevent below <1335
//   if ($(window).width() <= 1335) {
//     $(navItemsWithDropdown + ' > a').on('click', function (e) {
//       e.preventDefault();
//     });
//   }

//   // //products menuLinks click preventDefault
//   if ($(window).width() < 992) {
//     $(
//       'header .main-nav nav > ul > li.products .dropdown-menu .menu-links .white-circle-link a, header .main-nav nav > ul > li.products .dropdown-menu .menu-links .black-circle-link a'
//     ).on('click', function (e) {
//       e.preventDefault();
//     });
//   }

//   var dropdownMenu = 'header .main-nav nav > ul > li.with-dropdown .dropdown-menu';

//   if ($(dropdownMenu).length) {
//     $(dropdownMenu).on('click', function (event) {
//       event.stopPropagation();
//     });
//   }

//   var menuLinks = 'header .dropdown-menu .menu-links > ul > li';

//   if ($(menuLinks).length) {
//     $(menuLinks).on({
//       mouseenter: function () {
//         if ($(window).width() > 991) {
//           if (!$(this).hasClass('active')) {
//             $(this).siblings().removeClass('active');
//             $(this).addClass('active');

//             var adjMenuTabs = $(this).closest('.menu-links').siblings('.menu-tabs');
//             var tabId = this.dataset.tabId;

//             if (tabId) {
//               $(adjMenuTabs).find('.menu-links ul li').removeClass('active');

//               var firstMenuLink = $(this).closest('.dropdown-menu').find('.menu-links').first();
//               var menuLinkWidth = $(firstMenuLink).innerWidth();

//               if ($(window).width() >= 768) {
//                 var dropdownOffsetLeft = menuLinkWidth * -1 + 'px';

//                 $(this).closest('.menu-box').animate(
//                   {
//                     left: dropdownOffsetLeft,
//                   },
//                   200
//                 );
//               } else {
//                 var prevOffsetLeft = parseInt($(this).closest('.menu-box').css('left'), 10);
//                 var dropdownOffsetLeft = menuLinkWidth * -1 + prevOffsetLeft + 'px';

//                 $(this).closest('.menu-box').animate(
//                   {
//                     left: dropdownOffsetLeft,
//                   },
//                   200
//                 );
//               }

//               $(adjMenuTabs).addClass('show');
//               $(adjMenuTabs).find('.tab-panel').removeClass('active');
//               $(adjMenuTabs)
//                 .find('.tab-panel#' + tabId)
//                 .addClass('active');
//             } else {
//               $(adjMenuTabs).find('.menu-links ul li').removeClass('active');
//               $(adjMenuTabs).find('.tab-panel').removeClass('active');
//               $(adjMenuTabs).removeClass('show');
//             }
//           }
//         }
//       },
//       click: function () {
//         if ($(window).width() > 991) {
//           if (!$(this).hasClass('active') && $(this).closest('.menu-links').hasClass('sub-menu-links')) {
//             $(this).siblings().removeClass('active');
//             $(this).addClass('active');

//             var adjMenuTabs = $(this).closest('.menu-links').siblings('.menu-tabs');
//             var tabId = this.dataset.tabId;

//             if (tabId) {
//               $(adjMenuTabs).find('.menu-links ul li').removeClass('active');

//               var firstMenuLink = $(this).closest('.dropdown-menu').find('.menu-links').first();
//               var menuLinkWidth = $(firstMenuLink).innerWidth();

//               if ($(window).width() >= 768) {
//                 var dropdownOffsetLeft = menuLinkWidth * -1 + 'px';

//                 $(this).closest('.menu-box').animate(
//                   {
//                     left: dropdownOffsetLeft,
//                   },
//                   200
//                 );
//               } else {
//                 var prevOffsetLeft = parseInt($(this).closest('.menu-box').css('left'), 10);
//                 var dropdownOffsetLeft = menuLinkWidth * -1 + prevOffsetLeft + 'px';

//                 $(this).closest('.menu-box').animate(
//                   {
//                     left: dropdownOffsetLeft,
//                   },
//                   200
//                 );
//               }

//               $(adjMenuTabs).addClass('show');
//               $(adjMenuTabs).find('.tab-panel').removeClass('active');
//               $(adjMenuTabs)
//                 .find('.tab-panel#' + tabId)
//                 .addClass('active');
//             } else {
//               $(adjMenuTabs).find('.menu-links ul li').removeClass('active');
//               $(adjMenuTabs).find('.tab-panel').removeClass('active');
//               $(adjMenuTabs).removeClass('show');
//             }
//           }
//         }

//         if ($(window).width() <= 991) {
//           if (
//             $(this).closest('.with-dropdown').hasClass('manufacturers') ||
//             $(this).closest('.with-dropdown').hasClass('solutions')
//           ) {
//             return;
//           }

//           $(this).siblings().removeClass('active');
//           $(this).addClass('active');

//           var adjMenuTabs = $(this).closest('.menu-links').siblings('.menu-tabs');
//           var tabId = this.dataset.tabId;

//           if (tabId) {
//             $(adjMenuTabs).find('.menu-links ul li').removeClass('active');

//             var firstMenuLink = $(this).closest('.dropdown-menu').find('.menu-links').first();
//             var menuLinkWidth = $(firstMenuLink).innerWidth();

//             $(adjMenuTabs).addClass('show');
//             $(adjMenuTabs).find('.tab-panel').removeClass('active');
//             $(adjMenuTabs)
//               .find('.tab-panel#' + tabId)
//               .addClass('active');

//             if (!$(this).closest('ul').hasClass('featured-links')) {
//               var prevOffsetLeft = parseInt($(this).closest('.menu-box').css('left'), 10);
//               var dropdownOffsetLeft = prevOffsetLeft + menuLinkWidth * -1 + 'px';
//               var dropdownHeight = $(adjMenuTabs).outerHeight();

//               $(this).closest('.menu-box').animate(
//                 {
//                   left: dropdownOffsetLeft,
//                   height: dropdownHeight,
//                 },
//                 200
//               );
//             }
//           } else {
//             $(adjMenuTabs).find('.menu-links ul li').removeClass('active');
//             $(adjMenuTabs).find('.tab-panel').removeClass('active');
//             // $(adjMenuTabs).removeClass("show");
//           }
//         }
//       },
//     });
//   }

//   var goBack = 'header .dropdown-menu .menu-links .back-btn';

//   $(goBack).on('click', function () {
//     var currMenuLink = $(this).closest('.menu-links');
//     var prevMenuLink = $(this).closest('.menu-tabs').siblings('.menu-links');
//     var menuLinkWidth = $(currMenuLink).innerWidth();
//     var prevOffsetLeft = parseInt($(this).closest('.menu-box').css('left'), 10);
//     var dropdownOffsetLeft = prevOffsetLeft + menuLinkWidth + 'px';
//     var dropdownHeight = $(prevMenuLink).outerHeight();

//     $(this)
//       .closest('.menu-box')
//       .animate(
//         {
//           left: dropdownOffsetLeft,
//           height: dropdownHeight,
//         },
//         200,
//         function () {
//           $(currMenuLink).closest('.tab-panel').removeClass('active');
//         }
//       );
//   });

//   var winWidth = $(window).width();
//   $(window).on('resize', function () {
//     winWidth = $(window).width();
//     //close dropdown
//     $(navItemsWithDropdown)
//       .siblings()
//       .removeClass('active-nav')
//       .find('.dropdown-menu.open')
//       .removeClass('open');
//     $('header li.has-menu-tabs .menu-box').removeAttr('style');
//     if (winWidth <= 991) {
//       $('body').removeClass('stop-scroll');
//       $('header .main-nav nav').slideUp();
//       $('header .hamburger').removeClass('active');
//       header.removeClass('hide-utility-nav');
//     }
//   });

//   /**
//    * Header Scroll Functionality
//    */

//   var mainNavMenu = 'header .main-nav nav > ul > li.has-dropdown';
//   var prevScrollPos = $(window).scrollTop();
//   var header = $('header');
//   var utilityNavBottomPos = 0;
//   if (header.length) {
//     utilityNavBottomPos = $('header .top-nav').position().top + $('header .top-nav').outerHeight();
//   }
//   var stickyNav = $('.sticky-nav');
//   $(window).on('scroll', function () {
//     var currentScrollPos = $(window).scrollTop();

//     if (currentScrollPos > prevScrollPos && currentScrollPos > 0) {
//       // we are scrolling down
//       header.addClass('hide-nav');
//       $('body').removeClass('scrolling-up').addClass('scrolling-down');
//       stickyNav.removeClass('nav-show');
//     } else if (currentScrollPos < prevScrollPos && currentScrollPos < utilityNavBottomPos) {
//       // we are scrolling up and touched utility nav
//       if (currentScrollPos <= 130) {
//         header.removeClass('fixed hide-utility-nav');
//       }
//       header.removeClass('hide-nav hide-utility-nav');
//       stickyNav.addClass('nav-show');
//     } else if (currentScrollPos < prevScrollPos) {
//       // we are scrolling up

//       header.removeClass('hide-nav relative').addClass('hide-utility-nav fixed');
//       $('body').removeClass('scrolling-down').addClass('scrolling-up');
//       stickyNav.addClass('nav-show');
//     }
//     prevScrollPos = currentScrollPos;
//     $(mainNavMenu).find('.sub-menu').removeClass('active');
//   });

//   var searchOverlay = '.search-overlay';
//   var searchBtn = 'header .search-btn';
//   var searchInput = 'header .search-box input.ais-SearchBox-input.aa-input';

//   $(searchBtn).on('click', function () {
//     setTimeout(function(){
//       $("#globalsearchbox .ais-SearchBox-input").focus();
//     },100);
//     if (winWidth <= 991) {
//       $(searchOverlay).fadeIn();
//       $('body').css({ position: 'relative' });
//     }
//     $('header').addClass('search-clicked');
//     if ($('.hamburger').hasClass('active')) {
//       $('.hamburger').removeClass('active');
//     }
//   });

//   $(searchOverlay).on('click', function () {
//     if (winWidth <= 991) {
//       $(searchInput).val('');
//       $(searchOverlay).fadeOut();
//       $('header').removeClass('search-clicked');
//     } else {
//       $(searchInput).val('');
//       $('header').removeClass('search-clicked');
//     }
//   });

//   /**
//    * Hamburger functionality
//    */
//   var navLink = 'header .main-nav .row nav > ul > li';
//   var navMenu = 'header .main-nav .row nav';
//   var toggleBtn = 'header .main-nav .row .hamburger';
//   $(toggleBtn).on('click', function () {
//     $(this).toggleClass('active');
//     if ($(this).hasClass('active')) {
//       if ($('header').hasClass('search-clicked')) {
//         $('header').removeClass('search-clicked');
//       }
//       $(navMenu).fadeIn(function () {
//         $('body').addClass('stop-scroll');
//       });
//     } else {
//       $(navMenu).fadeOut(function () {
//         $('body').removeClass('stop-scroll');
//         $(navLink).removeClass('no-border');
//         $('header .main-nav .row nav > ul > li > .nav-links').removeClass('active');
//         $('.sub-menu.active').removeClass('active');
//       });
//     }
//   });
// })(jQuery);
