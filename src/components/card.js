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

  if (userId === cardData.owner._id) {
    if (deleteButton) {
      deleteButton.addEventListener("click", (event) =>
        deleteCard(event, cardData._id)
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

export function deleteCard(event, cardId) {
  deleteNewCard(cardId)
    .then(event.target.closest(".card").remove())
    .catch((err) => {
      console.error(err);
    });
}

// Функция лайка
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
