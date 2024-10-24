//Функция открытия попапа при клике на кнопку открытия
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
  document.querySelectorAll(".popup").forEach((el) => {
    el.addEventListener("mousedown", closeModalOverlay);
  });
  document.addEventListener("click", closeOnCross);
}

//Функция закрытия попапа при клике на кнопку закрытия
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

export function closeOnCross(evt) {
  const closeButton = evt.target.closest(".popup__close");
  if (closeButton) {
    const popup = closeButton.closest(".popup");
    closeModal(popup);
  }
  document.removeEventListener("click", closeOnCross);
}

//Функция, закрывающая попап с помощью эскейп
function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
  document.removeEventListener("keydown", closeModalEsc);
}

//Функция, закрывающая попап с помощью оверлея
export function closeModalOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
  document.removeEventListener("click", closeModalOverlay);
}
