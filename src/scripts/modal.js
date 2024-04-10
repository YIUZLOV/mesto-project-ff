//функция открытия модального окна
function openModal(namePopup) {
  namePopup.classList.add('popup_is-opened');
};

//функция закрытия модального окна
function closeModal(namePopup) {
  namePopup.classList.remove('popup_is-opened');
}

//фунция закрытия модального окна ESC
function closeKeyEsc(evt) {
  if (evt.keyCode === 27) {
    const openPopup = document.querySelector('.popup_is-opened')
    closeModal(openPopup)
  };
}

//функция закрытия модального окна мышью
function closeMouseClick(evt) {
  const openPopup = document.querySelector('.popup_is-opened');
  if (evt.target === openPopup) {
    closeModal(openPopup)
  };
};

export {openModal, closeModal, closeKeyEsc, closeMouseClick};