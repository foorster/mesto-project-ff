const placesList = document.querySelector(".places__list");
import "./styles/index.css";

import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupEsc,
  closePopupOverlay,
} from "./components/modal.js";

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData.name,
    cardData.link,
    deleteCard,
    openImage,
    likeCard
  );
  placesList.append(cardElement);
});

//Открытие попапа при клике на кнопку EDIT
let editButton = document.querySelector(".profile__edit-button");
let editPopup = document.querySelector(".popup_type_edit");
editButton.addEventListener("click", function () {
  openPopup(editPopup);
});

//Открытие попапа при клике на кнопку ADD
let addButton = document.querySelector(".profile__add-button");
let addCardPopup = document.querySelector(".popup_type_new-card");
addButton.addEventListener("click", function () {
  openPopup(addCardPopup);
});

//Открытие попапа при клике на IMAGE
let imagePopup = document.querySelector(".popup_type_image");
function openImage(srcImage) {
  openPopup(imagePopup);
  let images = document.querySelectorAll(".popup__image");
  images.forEach((img) => {
    img.setAttribute("src", srcImage);
  });
}

//Закрытие любого попапа при клике на кнопку крестик
let closeButton = document.querySelectorAll(".popup__close");
closeButton.forEach((el) => {
  el.addEventListener("click", function () {
    closePopup(document.querySelector(".popup_is-opened"));
  });
});

//Устанавливаем плейсхолдеры в форме EDIT
const formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_description");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
const submitButton = formElement.querySelectorAll(".popup__button");
submitButton.forEach((el) => {
  el.addEventListener("click", () => {
    closePopup(document.querySelector(".popup_is-opened"));
  });
});

const addCardForm = addCardPopup.querySelector(".popup__form");
// Создаем новую карточку с помощью createCard
function createNewCard(deleteCard, openImage) {
  const newNameCard = addCardForm.querySelector(
    'input[name="place-name"]'
  ).value;
  const newLinkCard = addCardForm.querySelector('input[name="link"]').value;
  return createCard(newNameCard, newLinkCard, deleteCard, openImage, likeCard);
}

// Сохраняем данные карточки и очищаем форму
function addNewCard(evt) {
  evt.preventDefault();
  placesList.prepend(createNewCard());
  closePopup(document.querySelector(".popup_is-opened"));
  addCardForm.reset();
}

// Создаем карточку при отправке формы
addCardForm.addEventListener("submit", addNewCard);
