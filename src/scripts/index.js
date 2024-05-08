import '../pages/index.css';
import { createCard, deleteCard } from './card.js';
import { openModal, closeModal, closeMouseClick } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { loadingUserData, loadingCardData, saveDataUser, saveAvatarUser, saveDataNewCard, deleteCardOnServer, putLikeCard, deleteLikeCard } from './api.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
let idUser = '';

const popupEditAvatar = document.querySelector('.popup_type_update-avatar');
const buttonPopupEditAvatar = popupEditAvatar.querySelector('.popup__button');
const buttonAvatarProfile = document.querySelector('.profile__image');
const avatarEditForm = document.querySelector('form[name="edit-avatar"]');
const urlInputAvatarEditForm = avatarEditForm.querySelector('.popup__input_type_url');

const popupEdit = document.querySelector('.popup_type_edit');
const buttonPopupEdit = popupEdit.querySelector('.popup__button');
const buttonEdit = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInputProfileForm = profileForm.querySelector('.popup__input_type_name');
const jobInputProfileForm = profileForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonPopupNewCard = popupNewCard.querySelector('.popup__button')
const buttonAddNewCard = document.querySelector('.profile__add-button');
const newCardForm = document.querySelector('form[name="new-place"]');
const nameInputNewCardForm = newCardForm.querySelector('.popup__input_type_card-name');
const urlInputNewCardForm = newCardForm.querySelector('.popup__input_type_url');

const popupFormImage = document.querySelector('.popup_type_image');
const popupImage = popupFormImage.querySelector('.popup__image');
const popupCaption = popupFormImage.querySelector('.popup__caption');

const popupConfirmDelete = document.querySelector('.popup_type_delete-card');
let cardToDelete;
let cardIdToDelete;

//объект настроек для валидации
const classesObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input-error',
  errorClassText: 'form__input-error-active'
};

//функция изменения кнопки при отправке данных на сервер
function renderLoading(status, buttonPopup) {
  buttonPopup.textContent = status ? 'Сохранение...' : 'Сохранить' ;
};

//функция создания новой карточки
function createNewCard(evt) {
  const dataNewCard = {
    name: nameInputNewCardForm.value,
    link: urlInputNewCardForm.value
  };
  renderLoading(true, buttonPopupNewCard);
  saveDataNewCard(dataNewCard)
    .then((res) => {
      const newCard = createCard(res, idUser, likeCard, handleOpenPopupConfirmDelete, handleOpenPopupImage)
      placesList.prepend(newCard)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, buttonPopupNewCard)
    });
  popupNewCard.reset;
  closeModal(popupNewCard);
};

//функция добавления карточек
function addCard(element) {
  const placesItem = createCard(element, idUser, likeCard, handleOpenPopupConfirmDelete, handleOpenPopupImage);
  placesList.append(placesItem);
};

//функция редактирования данных профиля
function handleProfileFormSubmit(evt) {
  const dataProfile = {
    name: nameInputProfileForm.value,
    job: jobInputProfileForm.value
  }
  renderLoading(true, buttonPopupEdit);
  saveDataUser(dataProfile)
    .then((res) => {
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, buttonPopupEdit)
    });
  closeModal(popupEdit);
};

//функция изменения аватара пользователя
function handleAvatarFormSubmit(evt) {
  const urlNewAvatar = urlInputAvatarEditForm.value;
  renderLoading(true, buttonPopupEditAvatar)
  saveAvatarUser(urlNewAvatar)
    .then((res) => {
      profileAvatar.setAttribute('style', `background-image: url(${res.avatar})`);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, buttonPopupEditAvatar)
    });
  closeModal(popupEditAvatar);
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

// функция обработчик открытия Popup  с изображением
function handleOpenPopupImage(namePopup, link, caption) {
  namePopup.addEventListener('click', () => {
    openModal(popupFormImage);
    popupImage.src = link.src;
    popupImage.alt = caption.textContent;
    popupCaption.textContent = caption.textContent;
  });
};

// функция обработчик открытия окна конферма удаления карточки
function handleOpenPopupConfirmDelete(buttonOpenPopup, idCard, cardElement) {
  buttonOpenPopup.addEventListener('click', () => {
    openModal(popupConfirmDelete);
    cardToDelete = cardElement;
    cardIdToDelete = idCard;
  });
};

// функция обработчик удаления карточки
function handleDeleteCard() {
  deleteCardOnServer(cardIdToDelete)
    .then(() => {
      deleteCard(cardToDelete)
    })
    .catch((err) => {
      console.log(err)
    })
    closeModal(popupConfirmDelete)
};

//функция постановки/снятия лайка с карточки
function likeCard(idCard, buttonLike, countLike) {
  const likeMethod = buttonLike.classList.contains('card__like-button_is-active') ? deleteLikeCard : putLikeCard;
  likeMethod(idCard) 
    .then((res) => {
      buttonLike.classList.toggle('card__like-button_is-active') 
      countLike.textContent = res.likes.length
    })
    .catch(err => console.log(err));
};

// промис для загрузки/вывода данных пользователя и списка карточек с сервера на сайт
Promise.all([loadingUserData(), loadingCardData()])
  .then(([dataUser, dataCard]) => {
    profileName.textContent = dataUser.name
    profileJob.textContent = dataUser.about
    profileAvatar.setAttribute('style', `background-image: url(${dataUser.avatar})`)
    idUser = dataUser._id
    dataCard.forEach(addCard);
  })
  .catch((err) => {
    console.log(err)
  });

//Добавление обработчиков
buttonEdit.addEventListener('click', () => {
  clearValidation (popupEdit, classesObject);
  openModal(popupEdit);
  nameInputProfileForm.value = profileName.textContent;
  jobInputProfileForm.value = profileJob.textContent;
});

buttonAddNewCard.addEventListener('click', () => {
  clearValidation (popupNewCard, classesObject);
  openModal(popupNewCard);
});

buttonAvatarProfile.addEventListener('click', () => {
  clearValidation (popupEditAvatar, classesObject);
  openModal(popupEditAvatar);
});

popups.forEach((popup) => {
  const butttonClose = popup.querySelector('.popup__close');
  handleClosePopup(butttonClose, popup);
});

popups.forEach((popup) => {
  handleClosePopupClickMouse(popup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

avatarEditForm.addEventListener('submit', handleAvatarFormSubmit);

newCardForm.addEventListener('submit', createNewCard);

popupConfirmDelete.addEventListener('submit', handleDeleteCard);

enableValidation(classesObject);