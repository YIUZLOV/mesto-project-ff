const cardTemplate = document.querySelector('#card-template').content;

//функция удаления карточки
function deleteCard(element) {
  element.remove();
};

//функция лайка карточки
function likeCard(buttonLike) {
  buttonLike.classList.toggle('card__like-button_is-active');
};

//функция создания карточки
function createCard(element, deleteCard, likeCard, handleOpenPopupImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButtonCard = cardElement.querySelector('.card__like-button');

  cardImage.src = element.link;
  cardName.textContent = element.name;
  cardImage.alt = element.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });
  handleOpenPopupImage(cardImage, cardImage, cardName);
  likeButtonCard.addEventListener('click', () => {
    likeCard(likeButtonCard);
  });
  return cardElement;
};

export { createCard, deleteCard, likeCard };