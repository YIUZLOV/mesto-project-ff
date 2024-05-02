const cardTemplate = document.querySelector('#card-template').content;

//функция удаления карточки
function deleteCard(element) {
  element.remove();
};

//функция создания карточки
function createCard(element, currentId, likeCard, handleDeleteCard, handleOpenPopupImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');

  const popupDeleteCard = document.querySelector('.popup_type_delete-card');
  const popupDeleteCardButton = popupDeleteCard.querySelector('.popup__button');
  const idCard = element._id;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButtonCard = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = element.link;
  cardName.textContent = element.name;
  cardImage.alt = element.name;
  cardLikeCount.textContent = element.likes.length;

  if (!(element.owner._id === currentId)) {
    deleteButton.setAttribute('style', 'display: none');
  };

  element.likes.forEach((evt) => {
    if (evt._id == currentId) {
      likeButtonCard.classList.add('card__like-button_is-active')
    }
  });

  handleDeleteCard(popupDeleteCard, deleteButton, idCard, cardElement);

  handleOpenPopupImage(cardImage, cardImage, cardName);

  likeButtonCard.addEventListener('click', () => {
    likeCard(idCard, likeButtonCard, cardLikeCount);
  });
  return cardElement;
};

export { createCard, deleteCard };