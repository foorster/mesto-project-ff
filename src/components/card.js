import { deleteNewCard, putLikeCard, delDislikeCard } from "./api.js";

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

  if (userId === cardData.owner._id) {
    // Если айди пользователя это мое айди, то повесь слушатель удаления на кнопку корзины
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

  const likeCounter = cardElement.querySelector(".card__like-counter");

  if (likeCounter) {
    likeCounter.textContent = cardData.likes.length;
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const result = cardData.likes.some((like) => like._id === userId);
  if (result) {
    likeButton.classList.add("card__like-button_is-active");
    likeButton.addEventListener(
      "click",
      (evt) => disLikeCard(evt, cardData._id),
      { once: true }
    );
  } else {
    likeButton.addEventListener("click", (evt) => likeCard(evt, cardData._id), {
      once: true,
    });
  }

  cardElementImage.addEventListener("click", () => {
    openImage(cardData.link, cardData.name);
  });

  return cardElement;
}

export function deleteCard(evt, cardId) {
  deleteNewCard(cardId) // Если получилось удалить с сервера
    .then(evt.target.closest(".card").remove()) // То удали отрисовку
    .catch((err) => {
      console.error(`Ошибка. Возможно не получилось удалить 
        карточку: ${err}`);
    });
}

export function likeCard(evt, cardId) {
  putLikeCard(cardId)
    .then((cardData) => {
      const closestCard = evt.target.closest(".card");
      const childLikeButton = closestCard.querySelector(".card__like-button");
      const childLikeCounter = closestCard.querySelector(".card__like-counter");
      childLikeButton.classList.add("card__like-button_is-active");
      childLikeCounter.textContent = cardData.likes.length;
      childLikeButton.addEventListener(
        "click",
        (evt) => disLikeCard(evt, cardData._id),
        { once: true }
      );
    })
    .catch((err) => {
      console.error(`Ошибка. ${err}`);
    });
}

export function disLikeCard(evt, cardId) {
  delDislikeCard(cardId)
    .then((cardData) => {
      const closestCard = evt.target.closest(".card");
      const childLikeButton = closestCard.querySelector(".card__like-button");
      const childLikeCounter = closestCard.querySelector(".card__like-counter");
      childLikeButton.classList.remove("card__like-button_is-active");
      childLikeCounter.textContent = cardData.likes.length;
      childLikeButton.addEventListener(
        "click",
        (evt) => likeCard(evt, cardData._id),
        { once: true }
      );
    })
    .catch((err) => {
      console.error(`Ошибка. ${err}`);
    });
}

// Функция лайка
/*export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}*/
