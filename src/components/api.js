const config = {
    baseUrl: 'https://nomoreparties.co/v1/',
    cohortId: 'wff-cohort-25',
    headers: {
      authorization: '5fc12cf0-959f-4012-b329-994066b1e5bb',
      'Content-Type': 'application/json'
    }
  };

// Получаем ответ от сервера, все ли ок
const checkResponse = res => {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка ${res.status}`)
}


// GET-запрос на URL
export const getProfileData = () => {
  return fetch(`${config.baseUrl}${config.cohortId}/users/me` , {
    headers: config.headers
  })
  .then(checkResponse)
};

// GET-запрос на карточки (заменить этими карточками те, что в файле кардс)
export const getCards = () => {
	return fetch(`${config.baseUrl}${config.cohortId}/cards`, {
		headers: config.headers,
	})
.then(checkResponse)
}


// Отправляем запрос методом PATCH, чтобы отредактированные данные профиля сохранялись на сервере
export function updateProfileData(name, about) {
	return fetch(`${config.baseUrl}${config.cohortId}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	})
.then(checkResponse)
}


// Отправляем POST-запрос чтобы добавить на сервер новую карточку
export function addCard(name, link) {

	return fetch(`${config.baseUrl}${config.cohortId}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	})
.then(checkResponse)
}

//Вместо cardId в URL нужно подставить свойство _id соответствующей карточки
// Делаем DELETE-запрос на удаление карточки
export function deleteNewCard(cardId) { // Функции удаления карточки передаем ее айди (надо будет проверить айди на собственность)
	return fetch(`${config.baseUrl}${config.cohortId}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
.then(checkResponse)
}


// Делаем PUT-запрос чтобы лайкнуть карточку 
function likeCard(cardId) { // Функции лайка надо передать айди карточки
	return fetch(`${config.baseUrl}${config.cohortId}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	})
.then(checkResponse)
}

// Делаем DELETE-запрос на удаление лайка с карточки
export function dislikeCard(cardId) { // Функции дизлайка надо передать айди карточки
	return fetch(`${config.baseUrl}${config.cohortId}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	})
.then(checkResponse)
}

// Отправляем  PATCH-запрос чтобы сменить аватар
function changeAvatar(url) { // Передаем функции ссылку аватарки
	return fetch(`${config.baseUrl}${config.cohortId}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({ avatar: url }),
	})
.then(checkResponse)
}
