// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards, createCard, deleteCard, likeCard } from './cards.js';
import { openModal, closeModal, closeKeyEsc, closeMouseClick } from './modal.js';

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

//функция создания новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  initialCards.unshift({
    name: nameInputCard.value,
    link: urlInputCard.value
  })
  const newCard = createCard(initialCards[0],{deleteCard},{openModal},{closeModal}, {likeCard});
  placesList.prepend(newCard);
  nameInputCard.value = '';
  urlInputCard.value = '';
  closeModal(popupNewCard);
}

//функция добавления карточек
function addCard(element) {
  const placesItem = createCard(element,{deleteCard},{openModal},{closeModal}, {likeCard});
  placesList.append(placesItem);
};

//функция редактирования данных профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
};

buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formElement.addEventListener('submit', handleFormSubmit);
  popupEditClose.addEventListener('click', () => {
    closeModal(popupEdit);
  });
});

buttonAddCard.addEventListener('click', () => {
  openModal(popupNewCard);
  newCardForm.addEventListener('submit', createNewCard);
  popupNewCardClose.addEventListener('click', () => {
    closeModal(popupNewCard);
  });
});

document.addEventListener('keydown', (evt) => {
  const openPopupAll = document.querySelector('.popup_is-opened');
  if (openPopupAll) {
    closeKeyEsc(evt)
  };
});

document.addEventListener('click', (evt) => {
  closeMouseClick(evt);
})

initialCards.forEach(addCard);



