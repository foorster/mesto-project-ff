export function createCard(cardData, deleteCard, openImage, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.alt;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteCard);
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  cardElementImage.addEventListener("click", () => {
    openImage(cardData.link, cardData.alt);
  });

  return cardElement;
}

export function deleteCard(event) {
  event.target.closest(".card").remove();
}

// Функция лайка
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
