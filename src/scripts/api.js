const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'fa5bd13f-738f-4d3c-80a7-9af426469b82',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const handleError = (err) => {
  console.log(err)
};

// GET запрос данных пользователя
const loadingUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleResponse)
};

// GET запрос массива с карточками
const loadingCardData = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse)
};

// PATCH запрос для отправки данных пользователя на сервер
const saveDataUser = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify ({
      name: name.textContent,
      about: job.textContent
    })
  })
    .then(handleResponse)
    .catch(handleError)
};

// PATCH запрос для отправки аватара пользователя на сервер
const saveAvatarUser = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify ({
      avatar: newAvatar,
    })
  })
    .then(handleResponse)
    .catch(handleError)
};

// POST запрос для отправки данных новой карточки на сервер
const saveDataNewCard = (dataNewCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify ({
      name: dataNewCard.name,
      link: dataNewCard.link
    })
  })
    .then(handleResponse)
    .catch(handleError)
};

// DELETE запрос для удаления карточки
const deleteCardOnServer = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify ({
      _id: idCard
    })
  })
    .then(handleResponse)
    .catch(handleError)
};

//PUT запрос постановки лайка
const putLikeCard = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify ({
      _id: idCard
    })
  })
    .then(handleResponse)
    .catch(handleError)  
};

//DELETE запрос для снятия лайка
const deleteLikeCard = (idCard) => {
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify ({
      _id: idCard
    })
  })
    .then(handleResponse)
    .catch(handleError)  
};

export { 
  loadingUserData,
  loadingCardData,
  saveDataUser,
  saveAvatarUser,
  saveDataNewCard,
  deleteCardOnServer,
  putLikeCard,
  deleteLikeCard
};