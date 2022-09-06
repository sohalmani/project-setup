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
