'use strict';

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

      if ($(accordion).hasClass('accordion--filter') && $(accordionItems).length && countActiveItems > 0 && countActiveItems < accordionItems.length) {
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
'use strict';

(function () {
  var circleAnimationsWithFigure = document.querySelectorAll('.circle-animations-with-figure');

  if (circleAnimationsWithFigure) {

    /**
     * Set up lottie animation
     * -----------------------
     * Add index class to each lottie element
     * Register each lottie animation
     * Create a waypoint to trigger the animation
     */
    var preLoadAnim = function preLoadAnim() {
      for (var i = 0; i < circleLottieAnimations.length; i++) {
        circleLottieAnimations[i].classList.add(i);
        lottieRegisteredAnim.push(lottie.registerAnimation(circleLottieAnimations[i]));

        var waypoint = new Waypoint({
          element: circleLottieAnimations[i],
          handler: function handler(direction) {
            // Only trigger play if element is hidden
            if (this.element.style.visibility != 'visible') {
              // Array index to play is the last class added to the element
              var animIndex = this.element.classList.length - 1;
              playAnimations(this.element.classList[animIndex]);
            }
          },
          // View offset from top for scrolling to trigger animation
          offset: '85%'
        });
      }
    };

    /**
     * Get the data-loop-frame attribute and duration
     * Play the first segment, and then keep playing from the loop segment after that
     * @param arrayPos (int) index of the animation to play
     */


    var playAnimations = function playAnimations(arrayPos) {
      var animDelay = parseFloat(circleLottieAnimations[arrayPos].getAttribute('data-delay') * 1000) || 0,
          loopFrame = parseInt(circleLottieAnimations[arrayPos].getAttribute('data-loop-frame')) || 1,
          thisDuration;

      // Make sure animation duration is defined before playing
      thisDuration = lottieRegisteredAnim[arrayPos].getDuration(true);

      if (thisDuration > 0) {
        setTimeout(function () {
          circleLottieAnimations[arrayPos].style.visibility = 'visible';

          lottieRegisteredAnim[arrayPos].playSegments([[0, loopFrame], [loopFrame + 1, thisDuration]], true);
        }, animDelay);
      } else {
        setTimeout(function () {
          circleLottieAnimations[arrayPos].style.visibility = 'visible';
        }, animDelay);
      }
    };

    var circleLottieAnimations = document.getElementsByClassName('lottie-circle'),
        lottieRegisteredAnim = [];

    window.addEventListener('load', function () {
      preLoadAnim();
    });
  }
})();
"use strict";
'use strict';

(function () {
  function validateInput(input) {
    var value = this.value;

    switch (input.type) {
      case 'text':
        return validateText(input);

      case 'tel':
        return validatePhoneNumber(input);

      case 'email':
        return validateEmail(input);

      case 'password':
        return validatePassword(input);

      case 'radio':
        return validateRadios(input);

      default:
        hideErrorMessage(this);
        return true;
    }
  }

  function validateText(input) {
    var arrOnlyAlphabets = ['first name', 'last name'];
    var labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    if (input.value.length > 0 && arrOnlyAlphabets.includes(labelText.toLowerCase()) && !onlyAlphabets(input.value)) {
      showErrorMessage(input, labelText + ' can only include alphabets');
      return false;
    } else if (input.hasAttribute('required') && input.value.length === 0) {
      showErrorMessage(input, labelText + ' cannot be empty');
      return false;
    } else {
      hideErrorMessage(input);
      return true;
    }
  }

  function validatePhoneNumber(input) {
    var labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    switch (input.getAttribute('aria-label').toLowerCase()) {
      case 'area code':
        if (input.value.length > 0 && !isPhoneCode(input.value)) {
          showErrorMessage(input, 'Please enter a valid ' + labelText.toLowerCase());
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, labelText + ' cannot be empty');
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      case 'zip code':
        if (input.value.length > 0 && !isPhoneCode(input.value)) {
          showErrorMessage(input, 'Please enter a valid ' + labelText.toLowerCase());
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, labelText + ' cannot be empty');
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      case 'credit card number':
        if (input.value.length > 0 && !isCreditCardNumber(input.value)) {
          showErrorMessage(input, 'Please enter a valid ' + labelText.toLowerCase());
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, labelText + ' cannot be empty');
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      case 'cvv number':
        if (input.value.length > 0 && !isCVVCode(input.value)) {
          showErrorMessage(input, 'Please enter a valid ' + labelText);
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, labelText + ' cannot be empty');
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      case 'exp date':
        if (input.value.length > 0 && !isExpiryDate(input.value)) {
          showErrorMessage(input, 'Please enter a valid ' + labelText);
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, labelText + ' cannot be empty');
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      default:
        if (input.value.length > 0 && (!isPhoneNumber(input.value) || input.value.length > 15)) {
          showErrorMessage(input, 'Please enter a valid ' + labelText.toLowerCase());
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, labelText + ' cannot be empty');
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }
    }
  }

  function validateEmail(input) {
    var labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    if (input.value.length > 0 && !isEmail(input.value)) {
      showErrorMessage(input, 'Please enter a valid ' + labelText.toLowerCase());
      return false;
    } else if (input.hasAttribute('required') && input.value.length === 0) {
      showErrorMessage(input, labelText + ' cannot be empty');
      return false;
    } else {
      hideErrorMessage(input);
      return true;
    }
  }

  function validatePassword(input) {
    var labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    if (input.value.length > 0 && !isPassword(input.value)) {
      showErrorMessage(input, labelText + ' must contain at least eight characters with one digit');
      return false;
    } else if (labelText.toLowerCase() === 'confirm password' && input.value.length > 0 && !isSamePassword(input)) {
      showErrorMessage(input, labelText + ' do not match');
      return false;
    } else if (input.hasAttribute('required') && input.value.length === 0) {
      showErrorMessage(input, labelText + ' cannot be empty');
      return false;
    } else {
      hideErrorMessage(input);
      return true;
    }
  }

  function validateRadios(input) {
    var labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    if (input.hasAttribute('required') && !isChecked(input)) {
      showErrorMessage(input, labelText + ' cannot be empty');
      return false;
    } else {
      hideErrorMessage(input);
      return true;
    }
  }

  function validateSelect(select) {
    var labelText = select.getAttribute('aria-label') ? select.getAttribute('aria-label') : 'Value';

    if (select.hasAttribute('required') && select.selectedIndex === 0) {
      showErrorMessage(select, 'Please select a ' + labelText.toLowerCase());
      return false;
    } else {
      hideErrorMessage(select);
      return true;
    }
  }

  function onlyAlphabets(value) {
    var alphabetFormat = /^[ a-zA-Z\-/']+$/;
    return alphabetFormat.test(value);
  }

  function isPhoneCode(value) {
    var phoneCodeFormat = /^[0-9]{0,6}$/;
    return phoneCodeFormat.test(value);
  }

  function isPhoneNumber(value) {
    var phoneNumberFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,7}$/im;

    // if (parseInt(value, 10) == 1234567890 || parseInt(value, 10) == 0000000000) {
    //   return false;
    // }

    return phoneNumberFormat.test(value);
  }

  function isEmail(value) {
    var emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFormat.test(value);
  }

  function isPassword(value) {
    var passowrdFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passowrdFormat.test(value);
  }

  function isSamePassword(input) {
    return input.value === input.closest('form').querySelector('input[type="password"]').value;
  }

  function isZipCode(value) {
    var zipCodeFormat = /^([0-9]{5}|[a-zA-Z][a-zA-Z ]{0,49})$/;
    return zipCodeFormat.test(value);
  }

  function isCreditCardNumber(value) {
    var creditCardNumberFormat = /^[0-9]{16}$/;

    if (!creditCardNumberFormat.test(value)) return false;

    return luhnCheck(value);

    function luhnCheck(value) {
      var sum = 0;

      for (var i = 0; i < value.length; i++) {
        var intVal = parseInt(value.substr(i, 1));

        if (i % 2 == 0) {
          intVal *= 2;

          if (intVal > 9) {
            intVal = 1 + intVal % 10;
          }
        }

        sum += intVal;
      }

      return sum % 10 == 0;
    }
  }

  function isCVVCode(value) {
    var CVVCodeFormat = /^[0-9]{3,4}$/;
    return CVVCodeFormat.test(value);
  }

  function isExpiryDate(value) {
    var expiryDateFormat = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    return expiryDateFormat.test(value);
  }

  function formatExpDate(e) {
    var inputChar = String.fromCharCode(e.keyCode);
    var code = e.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    e.target.value = e.target.value.replace(/^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(/^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(/^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(/^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(/[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(/\/\//g, '/' // Prevent entering more than 1 `/`
    );
  }

  function isChecked(option) {
    var radios = document.getElementsByName(option.name);
    var isChecked = void 0;

    var i = 0;
    while (!isChecked && i < radios.length) {
      if (radios[i].checked) isChecked = true;
      i++;
    }

    return isChecked;
  }

  function showErrorMessage(input, message) {
    var lastSibling = getLastSibling(input);

    if (!lastSibling || !lastSibling.classList.contains('error-message')) {
      appendErrorHtml(input);
      lastSibling = getLastSibling(input);
    }

    lastSibling.textContent = message;
    lastSibling.style.display = 'block';
  }

  function hideErrorMessage(input) {
    var lastSibling = getLastSibling(input);

    if (lastSibling && lastSibling.classList.contains('error-message')) {
      lastSibling.textContent = '';
      lastSibling.style.display = 'none';
    }
  }

  function appendErrorHtml(input) {
    var errorHtml = '<span class="error-message"></span>';
    input.parentElement.insertAdjacentHTML('beforeend', errorHtml);
  }

  function getLastSibling(input) {
    var nextSibling = input.nextElementSibling;

    if (nextSibling) {
      while (nextSibling.nextElementSibling) {
        nextSibling = nextSibling.nextElementSibling;
      }
    }

    return nextSibling;
  }
})();
'use strict';

(function () {
  var selectBox, countSelectBox;
  // Look for any elements with the class "select"
  selectBox = document.getElementsByClassName('select');
  countSelectBox = selectBox.length;
  for (var i = 0; i < countSelectBox; i++) {
    createSelect(selectBox[i]);
  }

  function createSelect(selectBox, idxSelect) {
    // Add default value to paramater
    if (!idxSelect) {
      idxSelect = 0;
    }

    var select, countOption, domSelect, domDropdown, domOption;

    select = selectBox.getElementsByTagName('select')[idxSelect];
    if (select) {
      if (select.disabled) {
        while (select.nextElementSibling && select.nextElementSibling.tagName === 'SELECT' && select.disabled) {
          select = select.nextElementSibling;
        }
      }

      countOption = select.length;

      // For each select, create a new div that will act as the selected item
      domSelect = document.createElement('div');
      domSelect.setAttribute('class', 'select-selected');
      domSelect.innerHTML = select.options[select.selectedIndex].innerHTML;
      if (select.selectedIndex !== 0) {
        domSelect.classList.add('default-removed');
      }
      selectBox.appendChild(domSelect);

      // For each select, create a new div that will act as a dropdown list
      domDropdown = document.createElement('div');
      domDropdown.setAttribute('class', 'select-items select-hide');

      // Inside this dropdown, add all the options present in the select
      for (var j = 1; j < countOption; j++) {
        // For each option, create a new div that will act as an option item
        domOption = document.createElement('div');
        domOption.innerHTML = select.options[j].innerHTML;
        domOption.setAttribute('data-value', select.options[j].value);
        if (select.selectedIndex !== 0 && select.selectedIndex === j) {
          domOption.classList.add('same-as-selected');
        }

        // When an item is clicked, update the original select box, and the selected item
        domOption.addEventListener('click', function (e) {
          var selected, prevOption, countOption, countPrevOption;
          countOption = select.length;
          selected = this.parentNode.previousSibling;

          for (var k = 0; k < countOption; k++) {
            if (select.options[k].innerHTML == this.innerHTML) {
              select.selectedIndex = k;
              selected.innerHTML = this.innerHTML;
              selected.classList.add('default-removed');
              // Remove previous active option
              prevOption = this.parentNode.getElementsByClassName('same-as-selected');
              countPrevOption = prevOption.length;
              for (var j = 0; j < countPrevOption; j++) {
                prevOption[j].removeAttribute('class');
              }
              // Set clicked option to active
              this.setAttribute('class', 'same-as-selected');
              break;
            }
          }
        });

        domDropdown.appendChild(domOption);
      }
      selectBox.appendChild(domDropdown);

      // When the select box is clicked, close any other select boxes, and open/close the current select box
      domSelect.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.style.top = this.offsetHeight + 'px';
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
      });
    }
  }

  // A function that will close all select boxes in the document, except the current select box
  function closeAllSelect(elmnt) {
    var dropdown,
        selected,
        countDropdown,
        countSelected,
        arrSelected = [];
    dropdown = document.getElementsByClassName('select-items');
    selected = document.getElementsByClassName('select-selected');
    countDropdown = dropdown.length;
    countSelected = selected.length;
    for (var i = 0; i < countSelected; i++) {
      if (elmnt == selected[i]) {
        arrSelected.push(i);
      } else {
        selected[i].classList.remove('select-arrow-active');
      }
    }
    for (i = 0; i < countDropdown; i++) {
      if (arrSelected.indexOf(i)) {
        dropdown[i].classList.add('select-hide');
      }
    }
  }

  function deleteSelect(selectBox) {
    selectBox.querySelector('.select-selected').remove();
    selectBox.querySelector('.select-items').remove();
  }

  // If the user clicks anywhere outside the select box, then close all select boxes:
  document.addEventListener('click', closeAllSelect);

  // Expose select creating and deleting functions as methods to global window object
  window.form = {
    createSelect: createSelect,
    deleteSelect: deleteSelect
  };
})();

/**
 * Range Slider
 */
(function ($) {
  var rangeSlider = ' .range-slider ';
  if ($(rangeSlider).length > 0) {
    var init = function init(range) {
      range.$input.attr({
        min: range.min,
        max: range.max
      });
    };

    // fetch range related infos


    var getRangeData = function getRangeData(range) {
      var input = $(range);
      var value = $(range).val();
      var thumb = $(range).closest(rangeSlider).find(rangeThumb);
      var popup = $(range).closest(rangeSlider).find(rangePopup);
      var track = $(range).closest(rangeSlider).find(rangeTrack);
      var labels = $(range).closest(rangeSlider).find(rangeLabel);
      var progress = $(range).closest(rangeSlider).find(rangeProgress);
      var min = parseInt(labels.eq(0).attr('data-value'), 10);
      var max = parseInt(labels.eq(labels.length - 1).attr('data-value'), 10);

      // return object
      return {
        $input: input,
        value: value,
        $thumb: thumb,
        $popup: popup,
        $track: track,
        $labels: labels,
        $progress: progress,
        min: min,
        max: max
      };
    };

    var displayRange = function displayRange(range, max, min) {
      var text = getPopupText(range);
      var multiplier = getMultiplier(range);
      var percentage = 0;
      if (min > 0) {
        percentage = multiplier;
      } else {
        percentage = multiplier / max * 100;
      }

      var shift = percentage ? percentage : 0;
      // display value inside popup
      range.$popup.text(text);
      // move thumb with value change
      range.$thumb.css('left', shift + '%');
      // move popup with value change
      range.$popup.css('left', shift + '%');
      // change track color to show progress
      range.$progress.css('width', shift + '%');
    };

    var getPopupText = function getPopupText(range) {
      var inputValue = range.value < range.min ? range.min : range.value;
      var popupText = '$' + inputValue.toLocaleString();

      return popupText;
    };

    var getMultiplier = function getMultiplier(range) {
      var inputValue = range.value < range.min ? range.min : range.value;
      if (range.min && range.max) {
        var relativeInputValue = inputValue - range.min;
        var relativeMaxValue = range.max - range.min;
        var multiplier = relativeInputValue * 100 / relativeMaxValue;
        return multiplier;
      }
      return inputValue;
    };

    var rangeInput = ' .range-slider input[type="range"] ';
    var rangeThumb = ' .range-thumb ';
    var rangePopup = ' .range-popup ';
    var rangeTrack = ' .range-track ';
    var rangeProgress = ' .range-track .range-progress ';
    var rangeLabel = ' .range-track .range-labels li ';
    // display value on initialisation
    $(function () {
      $.each($(rangeInput), function () {
        var range = getRangeData(this);

        // change range value to one in input range
        var initValue = $(this).attr('value');

        if (initValue > 0 && initValue > range.min && initValue < range.max) {
          range.value = initValue;
        }
        // initialise with predefined value
        init(range);
        // Display range value
        displayRange(range);
      });
    });

    // display value on range change
    $(rangeInput).on('input change', function () {
      var range = getRangeData(this);
      var max = $(this).attr("max");
      var min = $(this).attr("min");
      // Display range value
      displayRange(range, max, min);
    });
  }
})(jQuery);

(function () {
  var rangeSlider = document.querySelector('.range-slider2');
  var rangeInput = document.querySelectorAll('.range-slider2 input[type="range"]');
  var rangeThumb = '.range-slider2__thumb ';
  var rangePopup = '.range-slider2__popup';
  var rangeTrack = '.range-slider2__track ';
  var rangeProgress = '.range-slider2__track .range-slider2__progress ';
  var rangeLabel = '.range-slider2__track .range-slider2__labels li ';

  if (rangeSlider) {
    var init = function init(range) {
      range.input.setAttribute('min', range.min);
      range.input.setAttribute('max', range.max);
    };

    var getRangeData = function getRangeData(range) {
      var input = range;
      var value = input.value;
      var thumb = input.parentNode.querySelector(rangeThumb);
      var popup = input.parentNode.querySelector(rangePopup);
      var track = input.parentNode.querySelector(rangeTrack);
      var labels = input.parentNode.querySelector(rangeLabel);
      var progress = input.parentNode.querySelector(rangeProgress);
      var min = parseInt(labels.parentElement.firstElementChild.getAttribute('data-value'), 10);
      var max = parseInt(labels.parentElement.lastElementChild.getAttribute('data-value'), 10);

      // return object
      return {
        input: input,
        value: value,
        thumb: thumb,
        popup: popup,
        track: track,
        labels: labels,
        progress: progress,
        min: min,
        max: max
      };
    };

    var getPopupText = function getPopupText(range) {
      var inputValue = range.value < range.min ? range.min : range.value;
      var popupText = inputValue.toLocaleString();

      return popupText;
    };

    var getMultiplier = function getMultiplier(range) {
      var inputValue = range.value < range.min ? range.min : range.value;
      var relativeInputValue = inputValue - range.min;
      var relativeMaxValue = range.max - range.min;
      var multiplier = relativeInputValue * 100 / relativeMaxValue;

      return multiplier;
    };

    var displayRange = function displayRange(range) {
      var text = getPopupText(range);
      var multiplier = getMultiplier(range);
      var shift = multiplier + '%';

      // display value inside popup
      if (text == 0) {
        range.popup.style.display = 'none';
      } else {
        range.popup.style.display = 'block';
        range.popup.querySelector('.range-slider2__popup--value').textContent = text;
      }
      // move thumb with value change
      range.thumb.style.left = shift;
      // move popup with value change
      range.popup.style.left = shift;
      // change track color to show progress
      range.progress.style.width = shift;
    };

    rangeInput.forEach(function (element) {
      var range = getRangeData(element);
      var initValue = range.input.getAttribute('value');

      if (initValue > 0 && initValue > range.min && initValue < range.max) {
        range.value = initValue;
      }

      init(range);
      displayRange(range);

      element.addEventListener('change', function (e) {
        displayRange(getRangeData(this));
      });
    });
  }
})();

(function () {
  var inputGroup = document.querySelectorAll('.input-group');
  var tcoCalculator = document.querySelector('.tco-calculator');
  var inputBox = document.querySelectorAll('.tco-calculator input[type="number"]');
  var invalidChars = ['-', '+', 'e'];

  if (tcoCalculator) {
    if (inputGroup.length > 0) {
      inputBox.forEach(function (element) {
        element.addEventListener('keydown', function (e) {
          if (invalidChars.includes(e.key)) {
            e.preventDefault();
          }
        });
      });

      inputGroup.forEach(function (element) {
        element.addEventListener('click', function (e) {
          e.preventDefault();

          if (e.target.classList.contains('input-group__control--up')) {
            this.querySelector('input').stepUp();
          } else if (e.target.classList.contains('input-group__control--down')) {
            this.querySelector('input').stepDown();
          }
        });
      });
    }
  }
})();
'use strict';

(function ($) {
  var navItems = 'header .main-nav nav > ul > li';
  var $colThreeContent = $('header .services .col-three-content');

  if ($(navItems).length) {
    $(navItems).each(function () {
      if ($(this).find('.dropdown-menu').length) {
        $(this).addClass('with-dropdown');
      }

      if ($(this).find('.menu-tabs').length) {
        $(this).addClass('has-menu-tabs');

        var firstMenuLink = $(this).find('.menu-links').first();
        var menuLinkWidth = $(firstMenuLink).innerWidth();
        var dropdownOffsetLeft = menuLinkWidth / 2 * -1 + 'px';

        $(this).find('.menu-box').css('left', dropdownOffsetLeft);
      }
    });

    $colThreeContent.each(function () {
      if (this.childElementCount === 0) {
        $(this).addClass('blank-element');
      }
    });
  }

  var navItemsWithDropdown = 'header .main-nav nav > ul > li.with-dropdown';

  if ($(navItemsWithDropdown).length) {
    $(navItemsWithDropdown).on({
      mouseenter: function mouseenter() {
        if ($(window).width() > 991) {
          $('body').addClass('stop-scroll');

          $(this).siblings().removeClass('active-nav').find('.dropdown-menu.open').removeClass('open');
          $(this).addClass('active-nav').find('.dropdown-menu').addClass('open');
        }
      },
      mouseleave: function mouseleave() {
        $('body').removeClass('stop-scroll');
        if ($(window).width() > 991) {
          $(this).find('.menu-links ul li').removeClass('active');
          $(this).removeClass('active-nav').find('.dropdown-menu').removeClass('open');

          if ($(this).find('.menu-tabs').length) {
            $(this).find('.menu-tabs').removeClass('show').find('.tab-panel').removeClass('active');

            var firstMenuLink = $(this).find('.menu-links').first();
            var menuLinkWidth = $(firstMenuLink).innerWidth();
            var dropdownOffsetLeft = menuLinkWidth / 2 * -1 + 'px';

            $(this).find('.menu-box').css('left', dropdownOffsetLeft);

            $('body').removeClass('stop-scroll');
          }
        }
      },
      click: function click() {
        if ($(window).width() <= 991) {
          $('body').toggleClass('stop-scroll');
          $(this).siblings().removeClass('active-nav ').find('.dropdown-menu.open').removeClass('open');
          $(this).toggleClass('active-nav');
          $(this).find('.dropdown-menu').toggleClass('open');
          $(this).find('.dropdown-menu .menu-tabs').first().addClass('show');
        }
      }
    });
  }

  //Active nav on load
  var path = window.location.pathname;
  $('header nav ul li a[href="' + path + '"]').parents('.with-dropdown').eq(0).addClass('active-menu');

  //Click prevent below <1335
  if ($(window).width() <= 1335) {
    $(navItemsWithDropdown + ' > a').on('click', function (e) {
      e.preventDefault();
    });
  }

  // //products menuLinks click preventDefault
  if ($(window).width() < 992) {
    $('header .main-nav nav > ul > li.products .dropdown-menu .menu-links .white-circle-link a, header .main-nav nav > ul > li.products .dropdown-menu .menu-links .black-circle-link a').on('click', function (e) {
      e.preventDefault();
    });
  }

  var dropdownMenu = 'header .main-nav nav > ul > li.with-dropdown .dropdown-menu';

  if ($(dropdownMenu).length) {
    $(dropdownMenu).on('click', function (event) {
      event.stopPropagation();
    });
  }

  var menuLinks = 'header .dropdown-menu .menu-links > ul > li';

  if ($(menuLinks).length) {
    $(menuLinks).on({
      mouseenter: function mouseenter() {
        if ($(window).width() > 991) {
          if (!$(this).hasClass('active')) {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var adjMenuTabs = $(this).closest('.menu-links').siblings('.menu-tabs');
            var tabId = this.dataset.tabId;

            if (tabId) {
              $(adjMenuTabs).find('.menu-links ul li').removeClass('active');

              var firstMenuLink = $(this).closest('.dropdown-menu').find('.menu-links').first();
              var menuLinkWidth = $(firstMenuLink).innerWidth();

              if ($(window).width() >= 768) {
                var dropdownOffsetLeft = menuLinkWidth * -1 + 'px';

                $(this).closest('.menu-box').animate({
                  left: dropdownOffsetLeft
                }, 200);
              } else {
                var prevOffsetLeft = parseInt($(this).closest('.menu-box').css('left'), 10);
                var dropdownOffsetLeft = menuLinkWidth * -1 + prevOffsetLeft + 'px';

                $(this).closest('.menu-box').animate({
                  left: dropdownOffsetLeft
                }, 200);
              }

              $(adjMenuTabs).addClass('show');
              $(adjMenuTabs).find('.tab-panel').removeClass('active');
              $(adjMenuTabs).find('.tab-panel#' + tabId).addClass('active');
            } else {
              $(adjMenuTabs).find('.menu-links ul li').removeClass('active');
              $(adjMenuTabs).find('.tab-panel').removeClass('active');
              $(adjMenuTabs).removeClass('show');
            }
          }
        }
      },
      click: function click() {
        if ($(window).width() > 991) {
          if (!$(this).hasClass('active') && $(this).closest('.menu-links').hasClass('sub-menu-links')) {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var adjMenuTabs = $(this).closest('.menu-links').siblings('.menu-tabs');
            var tabId = this.dataset.tabId;

            if (tabId) {
              $(adjMenuTabs).find('.menu-links ul li').removeClass('active');

              var firstMenuLink = $(this).closest('.dropdown-menu').find('.menu-links').first();
              var menuLinkWidth = $(firstMenuLink).innerWidth();

              if ($(window).width() >= 768) {
                var dropdownOffsetLeft = menuLinkWidth * -1 + 'px';

                $(this).closest('.menu-box').animate({
                  left: dropdownOffsetLeft
                }, 200);
              } else {
                var prevOffsetLeft = parseInt($(this).closest('.menu-box').css('left'), 10);
                var dropdownOffsetLeft = menuLinkWidth * -1 + prevOffsetLeft + 'px';

                $(this).closest('.menu-box').animate({
                  left: dropdownOffsetLeft
                }, 200);
              }

              $(adjMenuTabs).addClass('show');
              $(adjMenuTabs).find('.tab-panel').removeClass('active');
              $(adjMenuTabs).find('.tab-panel#' + tabId).addClass('active');
            } else {
              $(adjMenuTabs).find('.menu-links ul li').removeClass('active');
              $(adjMenuTabs).find('.tab-panel').removeClass('active');
              $(adjMenuTabs).removeClass('show');
            }
          }
        }

        if ($(window).width() <= 991) {
          if ($(this).closest('.with-dropdown').hasClass('manufacturers') || $(this).closest('.with-dropdown').hasClass('solutions')) {
            return;
          }

          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var adjMenuTabs = $(this).closest('.menu-links').siblings('.menu-tabs');
          var tabId = this.dataset.tabId;

          if (tabId) {
            $(adjMenuTabs).find('.menu-links ul li').removeClass('active');

            var firstMenuLink = $(this).closest('.dropdown-menu').find('.menu-links').first();
            var menuLinkWidth = $(firstMenuLink).innerWidth();

            $(adjMenuTabs).addClass('show');
            $(adjMenuTabs).find('.tab-panel').removeClass('active');
            $(adjMenuTabs).find('.tab-panel#' + tabId).addClass('active');

            if (!$(this).closest('ul').hasClass('featured-links')) {
              var prevOffsetLeft = parseInt($(this).closest('.menu-box').css('left'), 10);
              var dropdownOffsetLeft = prevOffsetLeft + menuLinkWidth * -1 + 'px';
              var dropdownHeight = $(adjMenuTabs).outerHeight();

              $(this).closest('.menu-box').animate({
                left: dropdownOffsetLeft,
                height: dropdownHeight
              }, 200);
            }
          } else {
            $(adjMenuTabs).find('.menu-links ul li').removeClass('active');
            $(adjMenuTabs).find('.tab-panel').removeClass('active');
            // $(adjMenuTabs).removeClass("show");
          }
        }
      }
    });
  }

  var goBack = 'header .dropdown-menu .menu-links .back-btn';

  $(goBack).on('click', function () {
    var currMenuLink = $(this).closest('.menu-links');
    var prevMenuLink = $(this).closest('.menu-tabs').siblings('.menu-links');
    var menuLinkWidth = $(currMenuLink).innerWidth();
    var prevOffsetLeft = parseInt($(this).closest('.menu-box').css('left'), 10);
    var dropdownOffsetLeft = prevOffsetLeft + menuLinkWidth + 'px';
    var dropdownHeight = $(prevMenuLink).outerHeight();

    $(this).closest('.menu-box').animate({
      left: dropdownOffsetLeft,
      height: dropdownHeight
    }, 200, function () {
      $(currMenuLink).closest('.tab-panel').removeClass('active');
    });
  });

  var winWidth = $(window).width();
  $(window).on('resize', function () {
    winWidth = $(window).width();
    //close dropdown
    $(navItemsWithDropdown).siblings().removeClass('active-nav').find('.dropdown-menu.open').removeClass('open');
    $('header li.has-menu-tabs .menu-box').removeAttr('style');
    if (winWidth <= 991) {
      $('body').removeClass('stop-scroll');
      $('header .main-nav nav').slideUp();
      $('header .hamburger').removeClass('active');
      header.removeClass('hide-utility-nav');
    }
  });

  /**
   * Header Scroll Functionality
   */

  var mainNavMenu = 'header .main-nav nav > ul > li.has-dropdown';
  var prevScrollPos = $(window).scrollTop();
  var header = $('header');
  var utilityNavBottomPos = 0;
  if (header.length) {
    utilityNavBottomPos = $('header .top-nav').position().top + $('header .top-nav').outerHeight();
  }
  var stickyNav = $('.sticky-nav');
  $(window).on('scroll', function () {
    var currentScrollPos = $(window).scrollTop();

    if (currentScrollPos > prevScrollPos && currentScrollPos > 0) {
      // we are scrolling down
      header.addClass('hide-nav');
      $('body').removeClass('scrolling-up').addClass('scrolling-down');
      stickyNav.removeClass('nav-show');
    } else if (currentScrollPos < prevScrollPos && currentScrollPos < utilityNavBottomPos) {
      // we are scrolling up and touched utility nav
      if (currentScrollPos <= 130) {
        header.removeClass('fixed hide-utility-nav');
      }
      header.removeClass('hide-nav hide-utility-nav');
      stickyNav.addClass('nav-show');
    } else if (currentScrollPos < prevScrollPos) {
      // we are scrolling up

      header.removeClass('hide-nav relative').addClass('hide-utility-nav fixed');
      $('body').removeClass('scrolling-down').addClass('scrolling-up');
      stickyNav.addClass('nav-show');
    }
    prevScrollPos = currentScrollPos;
    $(mainNavMenu).find('.sub-menu').removeClass('active');
  });

  var searchOverlay = '.search-overlay';
  var searchBtn = 'header .search-btn';
  var searchInput = 'header .search-box input.ais-SearchBox-input.aa-input';

  $(searchBtn).on('click', function () {
    setTimeout(function () {
      $("#globalsearchbox .ais-SearchBox-input").focus();
    }, 100);
    if (winWidth <= 991) {
      $(searchOverlay).fadeIn();
      $('body').css({ position: 'relative' });
    }
    $('header').addClass('search-clicked');
    if ($('.hamburger').hasClass('active')) {
      $('.hamburger').removeClass('active');
    }
  });

  $(searchOverlay).on('click', function () {
    if (winWidth <= 991) {
      $(searchInput).val('');
      $(searchOverlay).fadeOut();
      $('header').removeClass('search-clicked');
    } else {
      $(searchInput).val('');
      $('header').removeClass('search-clicked');
    }
  });

  /**
   * Hamburger functionality
   */
  var navLink = 'header .main-nav .row nav > ul > li';
  var navMenu = 'header .main-nav .row nav';
  var toggleBtn = 'header .main-nav .row .hamburger';
  $(toggleBtn).on('click', function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      if ($('header').hasClass('search-clicked')) {
        $('header').removeClass('search-clicked');
      }
      $(navMenu).fadeIn(function () {
        $('body').addClass('stop-scroll');
      });
    } else {
      $(navMenu).fadeOut(function () {
        $('body').removeClass('stop-scroll');
        $(navLink).removeClass('no-border');
        $('header .main-nav .row nav > ul > li > .nav-links').removeClass('active');
        $('.sub-menu.active').removeClass('active');
      });
    }
  });
})(jQuery);
'use strict';

(function () {
  var lottieAnimation = document.getElementsByClassName('lottie'),
      lottieBox = document.getElementsByClassName('lottie-box'),
      lottieRegisteredAnim = [];

  // Set up lottie animations
  // Add index class to each lottie element
  // Register each lottie animation
  // Create a waypoint to trigger the animation
  function preLoadAnim() {
    for (var i = 0; i < lottieAnimation.length; i++) {
      lottieAnimation[i].classList.add(i);
      lottieRegisteredAnim.push(lottie.registerAnimation(lottieAnimation[i]));
      var waypoint = new Waypoint({
        element: lottieAnimation[i],
        handler: function handler(direction) {
          // Only trigger play if element is hidden
          if (this.element.style.visibility != 'visible') {
            // Array index to play is the last class added to the element
            var animIndex = this.element.classList.length - 1;
            playAnimations(this.element.classList[animIndex]);
          }
        },
        // View offset from top for scrolling to trigger animation
        offset: '85%'
      });
    }
  }

  // Get the data-loop-frame attribute and duration
  // Play the first segment, and then keep playing
  // from the loop segment after that
  // @param arrayPos (int) index of the animation to play
  function playAnimations(arrayPos) {
    var loopFrame = parseInt(lottieAnimation[arrayPos].getAttribute('data-loop-frame')) || 1,
        animDelay = parseFloat(lottieAnimation[arrayPos].getAttribute('data-delay') * 1000) || 0,
        thisDuration;
    // Make sure animation duration is defined before playing
    var interval = setInterval(function () {
      thisDuration = lottieRegisteredAnim[arrayPos].getDuration(true);
      if (thisDuration > 0) {
        clearInterval(interval);
        setTimeout(function () {
          lottieAnimation[arrayPos].style.visibility = 'visible';
          if (lottieBox[arrayPos] !== undefined) {
            lottieBox[arrayPos].style.visibility = 'visible';
            lottieBox[arrayPos].classList.add('reveal-anim');
          }
          lottieRegisteredAnim[arrayPos].playSegments([[0, loopFrame], [loopFrame + 1, thisDuration]], true);
        }, animDelay);
      } else {
        clearInterval(interval);
        setTimeout(function () {
          lottieAnimation[arrayPos].style.visibility = 'visible';
          if (lottieBox[arrayPos] !== undefined) {
            lottieBox[arrayPos].style.visibility = 'visible';
            lottieBox[arrayPos].classList.add('reveal-anim');
          }
        }, animDelay);
      }
    }, 1000);
  }

  window.addEventListener('load', function () {
    preLoadAnim();
  });
})();
//# sourceMappingURL=plugins.js.map
