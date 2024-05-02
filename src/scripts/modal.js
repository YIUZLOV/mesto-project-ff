//функция открытия модального окна
function openModal(namePopup) {
  namePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeKeyEsc);
};

//функция закрытия модального окна
function closeModal(namePopup) {
  namePopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeKeyEsc);
};

//функция закрытия модального окна ESC
function closeKeyEsc(evt) {
  if (evt.keyCode === 27) {
    const openPopup = document.querySelector('.popup_is-opened')
    closeModal(openPopup)
  };
};

//функция закрытия модального окна мышью
function closeMouseClick(evt) {
  const openPopup = document.querySelector('.popup_is-opened');
  if (evt.target === openPopup) {
    closeModal(openPopup)
  };
};

//функция изменения кнопки при отправке данных на сервер
function renderLoading(status, buttonPopup) {
  if (status) {
    buttonPopup.textContent = 'Сохранение...'
  } else {
    buttonPopup.textContent = 'Сохранить'
  }
};

export {openModal, closeModal, closeMouseClick, renderLoading };