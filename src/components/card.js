import { deleteNewCard } from "./api.js";

export function createCard(cardData, userId, deleteCard, openImage, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (userId === cardData.owner._id) { // Если айди пользователя это мое айди, то повесь слушатель удаления на кнопку корзины
    if (deleteButton) {
      deleteButton.addEventListener("click", (evt) =>
        deleteCard(evt, cardData._id) 
      );
    }
  } else {
    if (deleteButton) {
      deleteButton.remove();
    }
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  cardElementImage.addEventListener("click", () => {
    openImage(cardData.link, cardData.name);
  });

  return cardElement;
}

export function deleteCard(evt, cardId) {
  deleteNewCard(cardId) // Если получилось удалить с сервера
    .then(evt.target.closest(".card").remove())  // То удали отрисовку
    .catch((err) => {
      console.error(`Ошибка. Возможно не получилось удалить 
        карточку: ${err}`);
    });
}

// Функция лайка
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
