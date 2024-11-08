import { deleteNewCard, putLikeCard, delDislikeCard } from "./api.js";

export function createCard(
  cardData,
  userId,
  deleteCard,
  openImage,
  switchLike
) {
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
    // Если айди пользователя это мой айди, то повесь слушатель удаления на кнопку корзины
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

  // Заполняем счетчики лайков
  const likeCounter = cardElement.querySelector(".card__like-counter");
  if (likeCounter) {
    likeCounter.textContent = cardData.likes.length;
  }
  // Вешаем слушатель клика на лайк карточки
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    switchLike(likeButton, likeCounter, cardData._id);
  });
  // Если лайк мой, закрась его
  const result = cardData.likes.some((like) => like._id === userId);
  if (result) {
    likeButton.classList.add("card__like-button_is-active");
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

export function switchLike(likeButton, childLikeCounter, cardId) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    putLikeCard(cardId)
      .then((cardData) => {
        childLikeCounter.textContent = cardData.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error(`Ошибка. Данные о лайке не подгрузились: ${err}`);
      });
  } else {
    delDislikeCard(cardId)
      .then((cardData) => {
        childLikeCounter.textContent = cardData.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.error(`Ошибка. Данные о дизлайке не подгрузились: ${err}`);
      });
  }
}
