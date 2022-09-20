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
