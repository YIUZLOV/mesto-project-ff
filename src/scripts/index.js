import '../pages/index.css';
import { createCard, deleteCard } from './card.js';
import { openModal, closeModal, closeMouseClick, renderLoading } from './modal.js';
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

//объект настроек для валидации
const classesObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input-error',
  errorClassText: 'form__input-error-active'
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
      console.log(res)
      const newCard = createCard(res, idUser, likeCard, handleDeleteCard, handleOpenPopupImage)
      placesList.prepend(newCard)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, buttonPopupNewCard)
    });
  nameInputNewCardForm.value = '';
  urlInputNewCardForm.value = '';
  closeModal(popupNewCard);
};

//функция добавления карточек
function addCard(element) {
  const placesItem = createCard(element, idUser, likeCard, handleDeleteCard, handleOpenPopupImage);
  placesList.append(placesItem);
};

//функция редактирования данных профиля
function handleProfileFormSubmit(evt) {
  profileName.textContent = nameInputProfileForm.value;
  profileJob.textContent = jobInputProfileForm.value;
  renderLoading(true, buttonPopupEdit);
  saveDataUser(profileName, profileJob)
    .finally(() => {
      renderLoading(false, buttonPopupEdit);
    })
  closeModal(popupEdit);
};

//функция изменения аватара пользователя
function handleAvatarFormSubmit(evt) {
  const urlNewAvatar = urlInputAvatarEditForm.value;
  renderLoading(true, buttonPopupEditAvatar)
  saveAvatarUser(urlNewAvatar)
    .then(() => {
      profileAvatar.setAttribute('style', `background-image: url(${urlNewAvatar})`);
    })
    .finally(() => {
      renderLoading(false, buttonPopupEditAvatar)
    })
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

// функция обработчик удаления карточки
function handleDeleteCard(popupClose, buttonOpenPopup, idCard, cardElement) {
  buttonOpenPopup.addEventListener('click', () => {
    openModal(popupClose);
    popupClose.addEventListener('submit', () => {
      deleteCardOnServer(idCard)
        .then(() => {
          deleteCard(cardElement)
        })
        .catch((err) => {
          console.log(err);
        })
        closeModal(popupClose);
    })
  })
};

//функция постановки/снятия лайка с карточки
function likeCard(idCard, buttonLike, countLike) {
  if (!buttonLike.classList.contains('card__like-button_is-active')) {
    putLikeCard(idCard)
      .then((res) => {
        buttonLike.classList.add('card__like-button_is-active')
        countLike.textContent = res.likes.length
      })
      .catch((err) => {
        console.log(err)
      })
  } else{
    deleteLikeCard(idCard)
      .then((res) => {
        buttonLike.classList.remove('card__like-button_is-active')
        countLike.textContent = res.likes.length
      })
      .catch((err) => {
        console.log(err)
      })
  }
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
    console.log(err);
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

enableValidation(classesObject); 






