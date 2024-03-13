// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
function deleteCard(element) {
  element.remove();
};
function createCard(element,{deleteCard}) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = element.link;
  cardName.textContent = element.name;
  cardImage.alt = element.name;
  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  });
  return cardElement;
}
function addCard(element) {
  const placesItem = createCard(element,{deleteCard});
  placesList.append(placesItem);
};
initialCards.forEach(addCard);