const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
    {name: "Архыз", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},
    {name: "Челябинская область", link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {name: "Иваново", link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {name: "Камчатка", link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {name: "Холмогорский район", link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {name: "Байкал", link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
];

//функция удаления карточки
function deleteCard(element) {
  element.remove();
};

//функция лайка карточки
function likeCard(buttonLike) {
  buttonLike.classList.toggle('card__like-button_is-active');
}

//функция создания карточки
function createCard(element, {deleteCard}, {openModal}, {closeModal}, {likeCard}) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');

  const popupFormImage = document.querySelector('.popup_type_image');
  const popupImageClose = popupFormImage.querySelector('.popup__close');
  const popupImage = popupFormImage.querySelector('.popup__image');
  const popupCaption = popupFormImage.querySelector('.popup__caption');

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButtonCard = cardElement.querySelector('.card__like-button');

  cardImage.src = element.link;
  cardName.textContent = element.name;
  cardImage.alt = element.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', () => {
    openModal(popupFormImage);
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupCaption.textContent = element.name;
    popupImageClose.addEventListener('click', () => {
      closeModal(popupFormImage);
    });
  });

  likeButtonCard.addEventListener('click', () => {
    likeCard(likeButtonCard);
  })

  return cardElement;
};

export {initialCards, createCard, deleteCard, likeCard};