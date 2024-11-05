const placesList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector(".popup_type_edit");

const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector(".popup_type_new-card");
const addCardForm = addCardModal.querySelector(".popup__form");

const closeButtonList = document.querySelectorAll(".popup__close");

const formEditElement = document.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupTypeImage = document.querySelector(".popup_type_image");
const image = popupTypeImage.querySelector(".popup__image");
const caption = popupTypeImage.querySelector(".popup__caption");

const popupList = document.querySelectorAll(".popup");

const formEditProfile = document.querySelector(".popup__form_edit_profile");
const buttonEditProfile = formEditProfile.querySelector(
  ".popup__button_edit_profile"
);

const formAddPlace = document.querySelector(".popup__form_add_place");
const buttonAddPlace = formAddPlace.querySelector(
  ".popup__button_add_place"
);

import "./styles/index.css";

import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidationCheck, clearValidation, classListForm} from "./components/validate.js";


initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, openImage, likeCard);
  placesList.append(cardElement);
});

//Открытие попапа при клике на кнопку EDIT
editButton.addEventListener("click", function () {
  clearValidation(formEditProfile, buttonEditProfile);
  openModal(editModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

//Открытие попапа при клике на кнопку ADD
addButton.addEventListener("click", function () {
  clearValidation(formAddPlace, buttonAddPlace);
  openModal(addCardModal);
});

//Открытие попапа при клике на IMAGE
function openImage(srcImage, altImage) {
  image.setAttribute("src", srcImage);
  image.setAttribute("alt", altImage);
  caption.textContent = altImage;
  openModal(popupTypeImage);
}

//Лисенер крестика
closeButtonList.forEach((el) => {
  el.addEventListener("click", function () {
    const popup = el.closest(".popup");
    closeModal(popup);
  });
});

//Лисенер оверлея
popupList.forEach((el) => {
  el.addEventListener("click", function (evt) {
    if (evt.currentTarget === evt.target) {
      closeModal(evt.currentTarget);
    }
  });
});

// Обработчик «отправки» формы Edit
function editFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editModal);
}

// Слушает, что делать при нажатии на кнопку отправки
formEditElement.addEventListener("submit", editFormSubmit);

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


// Запускаем валидацию
enableValidationCheck(classListForm);
