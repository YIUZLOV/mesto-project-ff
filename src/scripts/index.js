// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, closeMouseClick } from './modal.js';

const placesList = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description')

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditClose = popupEdit.querySelector('.popup__close');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardClose = popupNewCard.querySelector('.popup__close');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const newCardForm = document.querySelector('form[name="new-place"]');
const nameInputCard = newCardForm.querySelector('.popup__input_type_card-name');
const urlInputCard = newCardForm.querySelector('.popup__input_type_url');

const popupFormImage = document.querySelector('.popup_type_image');
const popupImageClose = popupFormImage.querySelector('.popup__close');
const popupImage = popupFormImage.querySelector('.popup__image');
const popupCaption = popupFormImage.querySelector('.popup__caption');

//функция создания новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  initialCards.unshift({
    name: nameInputCard.value,
    link: urlInputCard.value
  });
  const newCard = createCard(initialCards[0],{ closeModal}, {likeCard}, {handleOpenPopupImage});
  placesList.prepend(newCard);
  nameInputCard.value = '';
  urlInputCard.value = '';
  closeModal(popupNewCard);
};

//функция добавления карточек
function addCard(element) {
  const placesItem = createCard(element, {closeModal}, {likeCard}, {handleOpenPopupImage});
  placesList.append(placesItem);
};

//функция редактирования данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
};

//функция обработчик Submit
function handleButtonSubmit(nameForm, nameFunction) {
  nameForm.addEventListener('submit', nameFunction);
};

//функция обработчик закрытия модального окна
function handleClosePopup(buttonClose, namePopup) {
  buttonClose.addEventListener('click', () => {
    closeModal(namePopup);
  })
};

//функция обработчик закрытия Popup по оверлею
function handleClosePopupClickMouse(namePopup) {
  namePopup.addEventListener('click', (evt) => {
    closeMouseClick(evt);
  });
};

// функция обработчик окткрытия Popup  с изображением
function handleOpenPopupImage(namePopup, link, caption) {
  namePopup.addEventListener('click', () => {
    openModal(popupFormImage);
    popupImage.src = link.src;
    popupImage.alt = caption.textContent;
    popupCaption.textContent = caption.textContent;
    handleClosePopup(popupImageClose, popupFormImage);
    handleClosePopupClickMouse(popupFormImage);
  });
};

buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  handleButtonSubmit(formElement, handleProfileFormSubmit);
  handleClosePopup(popupEditClose, popupEdit);
  handleClosePopupClickMouse(popupEdit);
});

buttonAddCard.addEventListener('click', () => {
  openModal(popupNewCard);
  handleButtonSubmit(newCardForm, createNewCard);
  handleClosePopup(popupNewCardClose, popupNewCard);
  handleClosePopupClickMouse(popupNewCard);
});

initialCards.forEach(addCard);



