export function createCard(name, link, deleteCard, openImage, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteCard);
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openImage(link);
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