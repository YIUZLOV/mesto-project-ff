//функция появления ошибки валидации формы
function showInputError (formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClassText);
}

//функция скрытия ошибки валидации формы
function hideInputError (formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClassText);
  errorElement.textContent = '';
}

//функция обработки появления/скрытия ошибки 
function isValid (formElement, inputElement, obj) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity("")
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj)
  } else {
    hideInputError(formElement, inputElement, obj)
  }
};

//функция проверки полей на валидность
function hasInvalidInput (inputList, obj) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// механика переключения кнопки в неактивный режим
function disableSubmitButton (buttonElement, obj) {
  buttonElement.disabled = true
  buttonElement.classList.add(obj.inactiveButtonClass)
};

//функиция переключения кнопки в неактивный режим, если валидация не пройдена
function toggleButtonState (inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList, obj)) {
    disableSubmitButton (buttonElement, obj)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(obj.inactiveButtonClass)
  }
};

//функция добавления обработчика на все поля формы
function setEventListeners (formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonForm = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonForm, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonForm, obj);
    });
  });
};

//функция отчистки ошибок валидации и полей, отключения кнопки
function clearValidation (formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonForm = formElement.querySelector(obj.submitButtonSelector);
  disableSubmitButton (buttonForm, obj);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, obj);
    inputElement.value = '';
  });
};

//функция включения валидации
function enableValidation (obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
  });
};

export { enableValidation, clearValidation };