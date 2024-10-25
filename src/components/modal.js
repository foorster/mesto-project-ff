//Функция открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
}

//Функция, закрывающая попап с помощью эскейп
function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const popup = closeModal(document.querySelector(".popup_is-opened"));
    if (popup) {
      closeModal(popup);
    }
  }
}

//Функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}
