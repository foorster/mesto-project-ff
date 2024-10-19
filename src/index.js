const placesList = document.querySelector(".places__list");
import "./styles/index.css";

import { initialCards } from "./cards.js";

function createCard(name, link, deleteCard, openImage) {
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

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openImage(link);
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData.name,
    cardData.link,
    deleteCard,
    openImage
  );
  placesList.append(cardElement);
});

function deleteCard(event) {
  event.target.closest(".card").remove();
}

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
let imageButtons = document.querySelectorAll(".places__item");
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

//Функция открытия попапа при клике на кнопку открытия
function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  document
    .querySelector(".popup_is-opened")
    .addEventListener("click", closePopupOverlay);
}

//Функция закрытия попапа при клике на кнопку закрытия
function closePopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
}

//Функция, закрывающая попап с помощью эскейп
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
  document.removeEventListener("keydown", closePopupEsc);
}

//Функция, закрывающая попап с помощью оверлея
function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(document.querySelector(".popup_is-opened"));
  }
  document.removeEventListener("click", closePopupOverlay);
}

//Устанавливаем плейсхолдеры в форме EDIT
let titleAtribute = document.querySelector(".popup__input_type_name");
let descriptionAtribute = document.querySelector(
  ".popup__input_type_description"
);
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

titleAtribute.setAttribute("placeholder", profileTitle.textContent);
descriptionAtribute.setAttribute("placeholder", profileDescription.textContent);
