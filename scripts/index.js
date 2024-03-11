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
function addCards(element) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  placesItem.querySelector('.card__image').src = element.link;
  placesItem.querySelector('.card__title').textContent = element.name;  
  deleteButton.addEventListener('click', function () {
    deleteCard(placesItem);
  });
  return placesList.append(placesItem);
};
initialCards.forEach(addCards);