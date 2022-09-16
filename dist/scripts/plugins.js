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

(function () {
  const circleAnimationsWithFigure = document.querySelectorAll('.circle-animations-with-figure');

  if (circleAnimationsWithFigure) {
    var circleLottieAnimations = document.getElementsByClassName('lottie-circle'),
    lottieRegisteredAnim = [];

    /**
     * Set up lottie animation
     * -----------------------
     * Add index class to each lottie element
     * Register each lottie animation
     * Create a waypoint to trigger the animation
     */
    function preLoadAnim() {
      for (var i = 0; i < circleLottieAnimations.length; i++) {
        circleLottieAnimations[i].classList.add(i);
        lottieRegisteredAnim.push(lottie.registerAnimation(circleLottieAnimations[i]));

        var waypoint = new Waypoint({
          element: circleLottieAnimations[i],
          handler: function (direction) {
            // Only trigger play if element is hidden
            if (this.element.style.visibility != 'visible') {
              // Array index to play is the last class added to the element
              var animIndex = this.element.classList.length - 1;
              playAnimations(this.element.classList[animIndex]);
            }
          },
          // View offset from top for scrolling to trigger animation
          offset: '85%',
        });
      }
    }

    /**
     * Get the data-loop-frame attribute and duration
     * Play the first segment, and then keep playing from the loop segment after that
     * @param arrayPos (int) index of the animation to play
     */
    function playAnimations(arrayPos) {
      var animDelay = parseFloat(circleLottieAnimations[arrayPos].getAttribute('data-delay') * 1000) || 0,
        loopFrame = parseInt(circleLottieAnimations[arrayPos].getAttribute('data-loop-frame')) || 1,
        thisDuration;

      // Make sure animation duration is defined before playing
      thisDuration = lottieRegisteredAnim[arrayPos].getDuration(true);

      if (thisDuration > 0) {
        setTimeout(function () {
          circleLottieAnimations[arrayPos].style.visibility = 'visible';

          lottieRegisteredAnim[arrayPos].playSegments(
            [
              [0, loopFrame],
              [loopFrame + 1, thisDuration],
            ],
            true
          );
        }, animDelay);
      } else {
        setTimeout(function () {
          circleLottieAnimations[arrayPos].style.visibility = 'visible';
        }, animDelay);
      }
    }

    window.addEventListener('load', function () {
      preLoadAnim();
    });
  }
})();
/*!
 *	dotdotdot JS 4.1.0
 *
 *	dotdotdot.frebsite.nl
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	License: CC-BY-NC-4.0
 *	http://creativecommons.org/licenses/by-nc/4.0/
 */
var Dotdotdot=function(){function t(e,i){void 0===i&&(i=t.options);var n=this;for(var o in this.container=e,this.options=i||{},this.watchTimeout=null,this.watchInterval=null,this.resizeEvent=null,t.options)t.options.hasOwnProperty(o)&&void 0===this.options[o]&&(this.options[o]=t.options[o]);var r=this.container.dotdotdot;r&&r.destroy(),this.API={},["truncate","restore","destroy","watch","unwatch"].forEach(function(t){n.API[t]=function(){return n[t].call(n)}}),this.container.dotdotdot=this.API,this.originalStyle=this.container.getAttribute("style")||"",this.originalContent=this._getOriginalContent(),this.ellipsis=document.createTextNode(this.options.ellipsis);var s=window.getComputedStyle(this.container);"break-word"!==s["word-wrap"]&&(this.container.style["word-wrap"]="break-word"),"pre"===s["white-space"]?this.container.style["white-space"]="pre-wrap":"nowrap"===s["white-space"]&&(this.container.style["white-space"]="normal"),null===this.options.height&&(this.options.height=this._getMaxHeight()),this.truncate(),this.options.watch&&this.watch()}return t.prototype.restore=function(){var t=this;this.unwatch(),this.container.setAttribute("style",this.originalStyle),this.container.classList.remove("ddd-truncated"),this.container.innerHTML="",this.originalContent.forEach(function(e){t.container.append(e)})},t.prototype.destroy=function(){this.restore(),this.container.dotdotdot=null},t.prototype.watch=function(){var t=this;this.unwatch();var e={width:null,height:null},i=function(i,n,o){if(t.container.offsetWidth||t.container.offsetHeight||t.container.getClientRects().length){var r={width:i[n],height:i[o]};return e.width==r.width&&e.height==r.height||t.truncate(),r}return e};"window"===this.options.watch?(this.resizeEvent=function(n){t.watchTimeout&&clearTimeout(t.watchTimeout),t.watchTimeout=setTimeout(function(){e=i(window,"innerWidth","innerHeight")},100)},window.addEventListener("resize",this.resizeEvent)):this.watchInterval=setInterval(function(){e=i(t.container,"clientWidth","clientHeight")},1e3)},t.prototype.unwatch=function(){this.resizeEvent&&(window.removeEventListener("resize",this.resizeEvent),this.resizeEvent=null),this.watchInterval&&clearInterval(this.watchInterval),this.watchTimeout&&clearTimeout(this.watchTimeout)},t.prototype.truncate=function(){var t=this,e=!1;return this.container.innerHTML="",this.originalContent.forEach(function(e){t.container.append(e.cloneNode(!0))}),this.maxHeight=this._getMaxHeight(),this._fits()||(e=!0,this._truncateToNode(this.container)),this.container.classList[e?"add":"remove"]("ddd-truncated"),this.options.callback.call(this.container,e),e},t.prototype._truncateToNode=function(e){var i=[],n=[];if(t.$.contents(e).forEach(function(t){if(1!=t.nodeType||!t.matches(".ddd-keep")){var e=document.createComment("");t.replaceWith(e),n.push(t),i.push(e)}}),n.length){for(var o=0;o<n.length;o++){i[o].replaceWith(n[o]);var r=this.ellipsis.cloneNode(!0);switch(n[o].nodeType){case 1:n[o].append(r);break;case 3:n[o].after(r)}var s=this._fits();if(r.parentElement.removeChild(r),!s){if("node"==this.options.truncate&&o>1)return void n[o-2].remove();break}}for(var a=o;a<i.length;a++)i[a].remove();var h=n[Math.max(0,Math.min(o,n.length-1))];if(1==h.nodeType){var c=document.createElement(h.nodeName);c.append(this.ellipsis),h.replaceWith(c),this._fits()?c.replaceWith(h):(c.remove(),h=n[Math.max(0,o-1)])}1==h.nodeType?this._truncateToNode(h):this._truncateToWord(h)}},t.prototype._truncateToWord=function(t){for(var e=t.textContent,i=-1!==e.indexOf(" ")?" ":"　",n=e.split(i),o=n.length;o>=0;o--)if(t.textContent=this._addEllipsis(n.slice(0,o).join(i)),this._fits()){"letter"==this.options.truncate&&(t.textContent=n.slice(0,o+1).join(i),this._truncateToLetter(t));break}},t.prototype._truncateToLetter=function(t){for(var e=t.textContent.split(""),i="",n=e.length;n>=0&&(!(i=e.slice(0,n).join("")).length||(t.textContent=this._addEllipsis(i),!this._fits()));n--);},t.prototype._fits=function(){return this.container.scrollHeight<=this.maxHeight+this.options.tolerance},t.prototype._addEllipsis=function(t){for(var e=[" ","　",",",";",".","!","?"];e.indexOf(t.slice(-1))>-1;)t=t.slice(0,-1);return t+=this.ellipsis.textContent},t.prototype._getOriginalContent=function(){var e="script, style";this.options.keep&&(e+=", "+this.options.keep),t.$.find(e,this.container).forEach(function(t){t.classList.add("ddd-keep")});var i="div, section, article, header, footer, p, h1, h2, h3, h4, h5, h6, table, td, td, dt, dd, li";[this.container].concat(t.$.find("*",this.container)).forEach(function(e){e.normalize(),t.$.contents(e).forEach(function(t){8==t.nodeType&&e.removeChild(t)}),t.$.contents(e).forEach(function(t){if(3==t.nodeType&&""==t.textContent.trim()){var n=t.previousSibling,o=t.nextSibling;(t.parentElement.matches("table, thead, tbody, tfoot, tr, dl, ul, ol, video")||!n||1==n.nodeType&&n.matches(i)||!o||1==o.nodeType&&o.matches(i))&&e.removeChild(t)}})});var n=[];return t.$.contents(this.container).forEach(function(t){n.push(t.cloneNode(!0))}),n},t.prototype._getMaxHeight=function(){if("number"==typeof this.options.height)return this.options.height;for(var t=window.getComputedStyle(this.container),e=["maxHeight","height"],i=0,n=0;n<e.length;n++){if("px"==(o=t[e[n]]).slice(-2)){i=parseFloat(o);break}}if("border-box"==t.boxSizing){e=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];for(n=0;n<e.length;n++){var o;"px"==(o=t[e[n]]).slice(-2)&&(i-=parseFloat(o))}}return Math.max(i,0)},t.version="4.1.0",t.options={ellipsis:"… ",callback:function(t){},truncate:"word",tolerance:0,keep:null,watch:"window",height:null},t.$={find:function(t,e){return e=e||document,Array.prototype.slice.call(e.querySelectorAll(t))},contents:function(t){return t=t||document,Array.prototype.slice.call(t.childNodes)}},t}();!function(t){void 0!==t&&(t.fn.dotdotdot=function(t){return this.each(function(e,i){var n=new Dotdotdot(i,t);i.dotdotdot=n.API})})}(window.Zepto||window.jQuery);


(function () {
  function validateInput(input) {
    const value = this.value;

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
    const arrOnlyAlphabets = ['first name', 'last name'];
    const labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    if (
      input.value.length > 0 &&
      arrOnlyAlphabets.includes(labelText.toLowerCase()) &&
      !onlyAlphabets(input.value)
    ) {
      showErrorMessage(input, `${labelText} can only include alphabets`);
      return false;
    } else if (input.hasAttribute('required') && input.value.length === 0) {
      showErrorMessage(input, `${labelText} cannot be empty`);
      return false;
    } else {
      hideErrorMessage(input);
      return true;
    }
  }

  function validatePhoneNumber(input) {
    const labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    switch (input.getAttribute('aria-label').toLowerCase()) {
      case 'area code':
        if (input.value.length > 0 && !isPhoneCode(input.value)) {
          showErrorMessage(input, `Please enter a valid ${labelText.toLowerCase()}`);
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, `${labelText} cannot be empty`);
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      case 'zip code':
        if (input.value.length > 0 && !isPhoneCode(input.value)) {
          showErrorMessage(input, `Please enter a valid ${labelText.toLowerCase()}`);
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, `${labelText} cannot be empty`);
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      case 'credit card number':
        if (input.value.length > 0 && !isCreditCardNumber(input.value)) {
          showErrorMessage(input, `Please enter a valid ${labelText.toLowerCase()}`);
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, `${labelText} cannot be empty`);
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      case 'cvv number':
        if (input.value.length > 0 && !isCVVCode(input.value)) {
          showErrorMessage(input, `Please enter a valid ${labelText}`);
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, `${labelText} cannot be empty`);
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      case 'exp date':
        if (input.value.length > 0 && !isExpiryDate(input.value)) {
          showErrorMessage(input, `Please enter a valid ${labelText}`);
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, `${labelText} cannot be empty`);
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }

      default:
        if (input.value.length > 0 && (!isPhoneNumber(input.value) || input.value.length > 15)) {
          showErrorMessage(input, `Please enter a valid ${labelText.toLowerCase()}`);
          return false;
        } else if (input.hasAttribute('required') && input.value.length === 0) {
          showErrorMessage(input, `${labelText} cannot be empty`);
          return false;
        } else {
          hideErrorMessage(input);
          return true;
        }
    }
  }

  function validateEmail(input) {
    const labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    if (input.value.length > 0 && !isEmail(input.value)) {
      showErrorMessage(input, `Please enter a valid ${labelText.toLowerCase()}`);
      return false;
    } else if (input.hasAttribute('required') && input.value.length === 0) {
      showErrorMessage(input, `${labelText} cannot be empty`);
      return false;
    } else {
      hideErrorMessage(input);
      return true;
    }
  }

  function validatePassword(input) {
    const labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    if (input.value.length > 0 && !isPassword(input.value)) {
      showErrorMessage(input, `${labelText} must contain at least eight characters with one digit`);
      return false;
    } else if (
      labelText.toLowerCase() === 'confirm password' &&
      input.value.length > 0 &&
      !isSamePassword(input)
    ) {
      showErrorMessage(input, `${labelText} do not match`);
      return false;
    } else if (input.hasAttribute('required') && input.value.length === 0) {
      showErrorMessage(input, `${labelText} cannot be empty`);
      return false;
    } else {
      hideErrorMessage(input);
      return true;
    }
  }

  function validateRadios(input) {
    const labelText = input.getAttribute('aria-label') ? input.getAttribute('aria-label') : 'Value';

    if (input.hasAttribute('required') && !isChecked(input)) {
      showErrorMessage(input, `${labelText} cannot be empty`);
      return false;
    } else {
      hideErrorMessage(input);
      return true;
    }
  }

  function validateSelect(select) {
    const labelText = select.getAttribute('aria-label') ? select.getAttribute('aria-label') : 'Value';

    if (select.hasAttribute('required') && select.selectedIndex === 0) {
      showErrorMessage(select, `Please select a ${labelText.toLowerCase()}`);
      return false;
    } else {
      hideErrorMessage(select);
      return true;
    }
  }

  function onlyAlphabets(value) {
    const alphabetFormat = /^[ a-zA-Z\-/']+$/;
    return alphabetFormat.test(value);
  }

  function isPhoneCode(value) {
    const phoneCodeFormat = /^[0-9]{0,6}$/;
    return phoneCodeFormat.test(value);
  }

  function isPhoneNumber(value) {
    const phoneNumberFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,7}$/im;

    // if (parseInt(value, 10) == 1234567890 || parseInt(value, 10) == 0000000000) {
    //   return false;
    // }

    return phoneNumberFormat.test(value);
  }

  function isEmail(value) {
    const emailFormat =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailFormat.test(value);
  }

  function isPassword(value) {
    const passowrdFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passowrdFormat.test(value);
  }

  function isSamePassword(input) {
    return input.value === input.closest('form').querySelector('input[type="password"]').value;
  }

  function isZipCode(value) {
    const zipCodeFormat = /^([0-9]{5}|[a-zA-Z][a-zA-Z ]{0,49})$/;
    return zipCodeFormat.test(value);
  }

  function isCreditCardNumber(value) {
    const creditCardNumberFormat = /^[0-9]{16}$/;

    if (!creditCardNumberFormat.test(value)) return false;

    return luhnCheck(value);

    function luhnCheck(value) {
      let sum = 0;

      for (let i = 0; i < value.length; i++) {
        let intVal = parseInt(value.substr(i, 1));

        if (i % 2 == 0) {
          intVal *= 2;

          if (intVal > 9) {
            intVal = 1 + (intVal % 10);
          }
        }

        sum += intVal;
      }

      return sum % 10 == 0;
    }
  }

  function isCVVCode(value) {
    const CVVCodeFormat = /^[0-9]{3,4}$/;
    return CVVCodeFormat.test(value);
  }

  function isExpiryDate(value) {
    const expiryDateFormat = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    return expiryDateFormat.test(value);
  }

  function formatExpDate(e) {
    var inputChar = String.fromCharCode(e.keyCode);
    var code = e.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    e.target.value = e.target.value
      .replace(
        /^([1-9]\/|[2-9])$/g,
        '0$1/' // 3 > 03/
      )
      .replace(
        /^(0[1-9]|1[0-2])$/g,
        '$1/' // 11 > 11/
      )
      .replace(
        /^([0-1])([3-9])$/g,
        '0$1/$2' // 13 > 01/3
      )
      .replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
        '$1/$2' // 141 > 01/41
      )
      .replace(
        /^([0]+)\/|[0]+$/g,
        '0' // 0/ > 0 and 00 > 0
      )
      .replace(
        /[^\d\/]|^[\/]*$/g,
        '' // To allow only digits and `/`
      )
      .replace(
        /\/\//g,
        '/' // Prevent entering more than 1 `/`
      );
  }

  function isChecked(option) {
    const radios = document.getElementsByName(option.name);
    let isChecked;

    var i = 0;
    while (!isChecked && i < radios.length) {
      if (radios[i].checked) isChecked = true;
      i++;
    }

    return isChecked;
  }

  function showErrorMessage(input, message) {
    let lastSibling = getLastSibling(input);

    if (!lastSibling || !lastSibling.classList.contains('error-message')) {
      appendErrorHtml(input);
      lastSibling = getLastSibling(input);
    }

    lastSibling.textContent = message;
    lastSibling.style.display = 'block';
  }

  function hideErrorMessage(input) {
    const lastSibling = getLastSibling(input);

    if (lastSibling && lastSibling.classList.contains('error-message')) {
      lastSibling.textContent = '';
      lastSibling.style.display = 'none';
    }
  }

  function appendErrorHtml(input) {
    const errorHtml = '<span class="error-message"></span>';
    input.parentElement.insertAdjacentHTML('beforeend', errorHtml);
  }

  function getLastSibling(input) {
    let nextSibling = input.nextElementSibling;

    if (nextSibling) {
      while (nextSibling.nextElementSibling) {
        nextSibling = nextSibling.nextElementSibling;
      }
    }

    return nextSibling;
  }
})();

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
        while (
          select.nextElementSibling &&
          select.nextElementSibling.tagName === 'SELECT' &&
          select.disabled
        ) {
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
        this.nextSibling.style.top = `${this.offsetHeight}px`;
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
    deleteSelect: deleteSelect,
  };
})();

/**
 * Range Slider
 */
(function ($) {
  var rangeSlider = ' .range-slider ';
  if ($(rangeSlider).length > 0) {
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
      const max = $(this).attr("max");
      const min = $(this).attr("min");
      // Display range value
      displayRange(range, max,min);
    });

    function init(range) {
      range.$input.attr({
        min: range.min,
        max: range.max,
      });
    }

    // fetch range related infos
    function getRangeData(range) {
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
        max: max,
      };
    }

    function displayRange(range,max,min) {
      var text = getPopupText(range);
      var multiplier = getMultiplier(range);
      let percentage=0;
      if(min>0){
        percentage = multiplier;
      }else{
        percentage = (multiplier/max)*100;
      }
      
      var shift = percentage?percentage:0;
      // display value inside popup
      range.$popup.text(text);
      // move thumb with value change
      range.$thumb.css('left', shift + '%');
      // move popup with value change
      range.$popup.css('left', shift + '%');
      // change track color to show progress
      range.$progress.css('width', shift + '%');
    }

    function getPopupText(range) {
      var inputValue = range.value < range.min ? range.min : range.value;
      var popupText = '$' + inputValue.toLocaleString();

      return popupText;
    }

    function getMultiplier(range) {
      var inputValue = range.value < range.min ? range.min : range.value;
      if (range.min && range.max) {
        var relativeInputValue = inputValue - range.min;
        var relativeMaxValue = range.max - range.min;
        var multiplier = (relativeInputValue * 100) / relativeMaxValue;
        return multiplier;
      }
      return inputValue;
    }
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

    function init(range) {
      range.input.setAttribute('min', range.min);
      range.input.setAttribute('max', range.max);
    }

    function getRangeData(range) {
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
        max: max,
      };
    }

    function getPopupText(range) {
      var inputValue = range.value < range.min ? range.min : range.value;
      var popupText = inputValue.toLocaleString();

      return popupText;
    }

    function getMultiplier(range) {
      var inputValue = range.value < range.min ? range.min : range.value;
      var relativeInputValue = inputValue - range.min;
      var relativeMaxValue = range.max - range.min;
      var multiplier = (relativeInputValue * 100) / relativeMaxValue;

      return multiplier;
    }

    function displayRange(range) {
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
    }
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
        handler: function (direction) {
          // Only trigger play if element is hidden
          if (this.element.style.visibility != 'visible') {
            // Array index to play is the last class added to the element
            var animIndex = this.element.classList.length - 1;
            playAnimations(this.element.classList[animIndex]);
          }
        },
        // View offset from top for scrolling to trigger animation
        offset: '85%',
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
          lottieRegisteredAnim[arrayPos].playSegments(
            [
              [0, loopFrame],
              [loopFrame + 1, thisDuration],
            ],
            true
          );
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

/**
 * Version: 1.8.0
 * Author: Ken Wheeler
 * Website: http://kenwheeler.github.io
 * Docs: http://kenwheeler.github.io/slick
 * Repo: http://github.com/kenwheeler/slick
 * Issues: http://github.com/kenwheeler/slick/issues
 */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});
//# sourceMappingURL=plugins.js.map
