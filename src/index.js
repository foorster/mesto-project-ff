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
const imageInput = document.querySelector(".popup__input_profile-image");
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
const buttonAddPlace = formAddPlace.querySelector(".popup__button_add_place");
const inputAddName = formAddPlace.querySelector(".popup__input_type_card-name");
const inputAddLink = formAddPlace.querySelector(".popup__input_type_url");

const profileAvatarEdit = document.querySelector(".profile__avatar-button");
const profileImageModal = document.querySelector(".popup_type_avatar_edit");
const profileImageForm = profileImageModal.querySelector(".popup__form");
const profileImageSrc = document.querySelector(".profile__image");
const profileSubmitButton = document.querySelector(
  ".popup__button_profile-image"
);

const classListForm = {
  // Выбираем форму, инпуты и кнопку сабмита
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  // Классы для скрытия кнопки, оформления текста ошибкок и скрытия ошибок (через visibility)
  inactiveButtonClass: "popup__submit_disabled", // Делает оформление кнопки как у недоступной
  inputErrorClass: "popup__input_type_error", // Делает подчеркивание инпута красным
  errorClass: "popup__input_type_visible", // Делает текст ошибок видимым
};

import "./styles/index.css";
/*import { initialCards } from "./components/cards.js";*/
import { createCard, deleteCard, switchLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  enableValidationCheck,
  clearValidation,
} from "./components/validate.js";
import {
  getProfileData,
  getCards,
  updateProfileData,
  addCard,
  changeAvatar,
} from "./components/api.js";

/*initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, openImage, likeCard);
  placesList.append(cardElement);
});*/

// Отрисовываем карточки
const showCards = (cardsData, userId) => {
  cardsData.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      userId,
      deleteCard,
      openImage,
      switchLike
    );
    placesList.prepend(cardElement);
  });
};

Promise.all([getProfileData(), getCards()])
  .then(([userData, cardsData]) => {
    // Получили ответ от сервера в виде объекта пользователя и карточек
    // Сортируем карточки, чтобы вверху сайта отображались последние добавленные
    cardsData.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      } else if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });
    // Записываем полученные данные из объекта пользователя в верстку
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImageSrc.style.backgroundImage = `url(${userData.avatar})`;
    // Передаем полученные с сервера данные в функцию отрисовки
    showCards(cardsData, userData._id);
  })
  .catch((err) => {
    console.log(
      `Ошибка. Не получилось записать информацию о 
      пользователе страницы, либо отобразить карточки: ${err}`
    );
  });

//Открытие попапа при клике на кнопку EDIT
editButton.addEventListener("click", function () {
  clearValidation(formEditProfile, buttonEditProfile, classListForm);
  openModal(editModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

//Открытие попапа при клике на кнопку ADD
addButton.addEventListener("click", function () {
  clearValidation(formAddPlace, buttonAddPlace, classListForm);
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
  const textOnSubmitButton = buttonEditProfile.textContent;
  buttonEditProfile.textContent = "Сохранение ...";
  updateProfileData(nameInput.value, jobInput.value) // PATCH
    .then((data) => {
      // Если получилось сохранить данные, то запиши их в верстку
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .then(closeModal(editModal))
    .then(clearValidation(formEditProfile, buttonEditProfile, classListForm))
    .catch((err) => {
      console.error(`Ошибка. Возможно не получилось загрузить 
      данные пользователя в профиль: ${err}`);
    })
    .finally((buttonEditProfile.textContent = textOnSubmitButton));
}

// Слушает, что делать при нажатии на кнопку отправки
formEditElement.addEventListener("submit", editFormSubmit);

function addCardSubmit(evt) {
  evt.preventDefault();
  const textOnSubmitButton = buttonAddPlace.textContent;
  buttonAddPlace.textContent = "Сохранение ...";
  addCard(inputAddName.value, inputAddLink.value) // POST
    .then((card) => {
      // Если получилось, создай новую карточку (передали данные)
      const newCardElement = createCard(
        card,
        card.owner._id, // Это моя карточка
        deleteCard,
        openImage,
        switchLike
      );
      placesList.prepend(newCardElement);
    })
    .then(closeModal(addCardModal))
    .then(addCardForm.reset())
    .catch((err) => {
      console.error(`Ошибка. Возможно не получилось запостить 
    карточку: ${err}`);
    })
    .finally((buttonAddPlace.textContent = textOnSubmitButton));
}

profileAvatarEdit.addEventListener("click", () => {
  clearValidation(profileImageForm, profileSubmitButton, classListForm);
  openModal(profileImageModal);
});

function profileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  const textOnSubmitButton = profileSubmitButton.textContent;
  profileSubmitButton.textContent = "Сохранение ...";
  changeAvatar(imageInput.value) // PATCH
    .then((data) => {
      // Если получилось сохранить картинку, то запиши ee в верстку
      profileImageSrc.style.backgroundImage = `url(${data.avatar})`;
    })
    .then(closeModal(profileImageModal))
    .then(profileImageForm.reset())
    .catch((err) => {
      console.error(`Ошибка. Возможно не получилось загрузить 
      аватар в профиль: ${err}`);
    })
    .finally((profileSubmitButton.textContent = textOnSubmitButton));
}

// Меняем аватарку при отпрвки формы
profileImageForm.addEventListener("submit", profileFormSubmit);

// Создаем карточку при отправке формы
addCardForm.addEventListener("submit", addCardSubmit);

// Запускаем валидацию
enableValidationCheck(classListForm);
