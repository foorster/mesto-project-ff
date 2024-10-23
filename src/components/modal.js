//Функция открытия попапа при клике на кнопку открытия
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  listenEsc();
  listenOverlay();
}

export function listenEsc() {
  document.addEventListener("keydown", closeModalEsc);
}

export function listenOverlay() {
  document
    .querySelector(".popup_is-opened")
    .addEventListener("mousedown", closeModalOverlay);
}

//Функция закрытия попапа при клике на кнопку закрытия
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

//Функция, закрывающая попап с помощью эскейп
function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
  document.removeEventListener("keydown", closeModal);
}

//Функция, закрывающая попап с помощью оверлея
export function closeModalOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
  document.removeEventListener("click", closeModal);
}
