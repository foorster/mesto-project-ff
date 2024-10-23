const placesList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector(".popup_type_edit");

const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector(".popup_type_new-card");

const imageModal = document.querySelector(".popup_type_image");

const closeButtonList = document.querySelectorAll(".popup__close");

const formEditElement = document.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const submitButton = formEditElement.querySelector(".popup__button");

const addCardForm = addCardModal.querySelector(".popup__form");

import "./styles/index.css";

import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeModalEsc,
  closeModalOverlay,
  listenEsc,
  listenOverlay,
} from "./components/modal.js";

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, openImage, likeCard);
  placesList.append(cardElement);
});

//Открытие попапа при клике на кнопку EDIT

editButton.addEventListener("click", function () {
  openModal(editModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

//Открытие попапа при клике на кнопку ADD

addButton.addEventListener("click", function () {
  openModal(addCardModal);
});

//Открытие попапа при клике на IMAGE

function openImage(srcImage, altImage) {
  openModal(imageModal);
  const popupTypeImage = document.querySelector(".popup_type_image");
  const image = popupTypeImage.querySelector(".popup__image");
  const caption = popupTypeImage.querySelector(".popup__caption");
  image.setAttribute("src", srcImage);
  caption.setAttribute("alt", altImage);
}

//Закрытие любого попапа при клике на кнопку крестик

closeButtonList.forEach((el) => {
  el.addEventListener("click", function () {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup.closest(".popup"));
  });
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener("submit", editFormSubmit);

submitButton.addEventListener("click", () => {
  const popup = document.querySelector(".popup_is-opened");
  closeModal(popup.closest(".popup"));
});

// Создаем новую карточку с помощью createCard
function createNewCard() {
  const newCardData = {
    name: addCardForm.querySelector('input[name="place-name"]').value,
    link: addCardForm.querySelector('input[name="link"]').value,
  };
  return createCard(newCardData, deleteCard, openImage, likeCard);
}

// Сохраняем данные карточки и очищаем форму
function addNewCard(evt) {
  evt.preventDefault();
  placesList.prepend(createNewCard());
  closeModal(addCardModal);
  addCardForm.reset();
}

// Создаем карточку при отправке формы
addCardForm.addEventListener("submit", addNewCard);
