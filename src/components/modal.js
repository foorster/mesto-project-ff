//Функция открытия попапа при клике на кнопку открытия
export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  document
    .querySelector(".popup_is-opened")
    .addEventListener("click", closePopupOverlay);
}

//Функция закрытия попапа при клике на кнопку закрытия
export function closePopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
}

//Функция, закрывающая попап с помощью эскейп
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
  document.removeEventListener("keydown", closePopupEsc);
}

//Функция, закрывающая попап с помощью оверлея
export function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(document.querySelector(".popup_is-opened"));
  }
  document.removeEventListener("click", closePopupOverlay);
}
