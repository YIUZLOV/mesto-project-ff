import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, closeMouseClick } from './modal.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInputProfileForm = profileForm.querySelector('.popup__input_type_name');
const jobInputProfileForm = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description')

const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const newCardForm = document.querySelector('form[name="new-place"]');
const nameInputNewCardForm = newCardForm.querySelector('.popup__input_type_card-name');
const urlInputNewCardForm = newCardForm.querySelector('.popup__input_type_url');

const popupFormImage = document.querySelector('.popup_type_image');
const popupImage = popupFormImage.querySelector('.popup__image');
const popupCaption = popupFormImage.querySelector('.popup__caption');

//функция создания новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  const dataNewCard = {
    name: nameInputNewCardForm.value,
    link: urlInputNewCardForm.value
  };
  const newCard = createCard(dataNewCard, deleteCard, likeCard, handleOpenPopupImage);
  placesList.prepend(newCard);
  nameInputNewCardForm.value = '';
  urlInputNewCardForm.value = '';
  closeModal(popupNewCard);
};

//функция добавления карточек
function addCard(element) {
  const placesItem = createCard(element, deleteCard, likeCard, handleOpenPopupImage);
  placesList.append(placesItem);
};

//функция редактирования данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfileForm.value;
  profileJob.textContent = jobInputProfileForm.value;
  closeModal(popupEdit);
};

//функция обработчик закрытия модального окна по крестику
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
  });
};

//Добавление обработчиков
buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
  nameInputProfileForm.value = profileName.textContent;
  jobInputProfileForm.value = profileJob.textContent;
});

buttonAddNewCard.addEventListener('click', () => {
  openModal(popupNewCard);
});

popups.forEach((popup) => {
  const butttonClose = popup.querySelector('.popup__close');
  handleClosePopup(butttonClose, popup);
});

popups.forEach((popup) => {
  handleClosePopupClickMouse(popup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

newCardForm.addEventListener('submit', createNewCard);

//вывод стартовых карточек на страницу
initialCards.forEach(addCard);



