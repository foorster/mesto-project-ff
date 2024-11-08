// Функция показа ошибок валидации
const showValidationError = function (
  formItem,
  inputItem,
  errorMessage,
  settings
) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`); // Берет нужный спан, куда надо вписать ошибку
  inputItem.classList.add(settings.inputErrorClass); // Берем инпут из объекта и добавляем ему класс, который делает красную обводку
  errorItem.textContent = errorMessage; // Передаем в нужный спан текст ошибки
  errorItem.classList.add(settings.errorClass); // Показываем текст ошибок (через visibility)
};

// Функция скрытия ошибок валидации
const hideValidationError = function (formItem, inputItem, settings) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`); // Берет нужный спан, откуда надо удалить ошибку
  inputItem.classList.remove(settings.inputErrorClass); // Берем инпут из объекта и удаляем класс, который делает красную обводку
  errorItem.textContent = ""; // Очищаем ошибки, передав пустую строку
  errorItem.classList.remove(settings.errorClass); // Скрываем текст ошибок (через visibility)
};

// Функция проверки валидации форм
const checkInputValidity = function (formItem, inputItem, settings) {
  // Передаем функции нужную форму, нужный импут и объект с данными
  inputItem.setCustomValidity(""); // Очищаем спан после каждого введенного символа, чтобы ошибка не оставалась
  const regex = /[а-яёa-z\s\-]+$/gi; // Пишем, что поле ввода должно содержать только латиницу, кириллицу, дефисы и пробелы

  if (!inputItem.value) {
    // Задаем условия для введенного в инпут текста и устанавливаем нужный validationMessage
    inputItem.setCustomValidity("Вы пропустили это поле.");
  } else if (
    inputItem.type === "text" &&
    (inputItem.value.length < inputItem.minLength ||
      inputItem.value.length > inputItem.maxLength)
  ) {
    inputItem.setCustomValidity(
      `Длина должна быть от ${inputItem.minLength} до ${inputItem.maxLength} символов.`
    );
  } else if (inputItem.type === "text" && !regex.test(inputItem.value)) {
    inputItem.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else if (inputItem.type === "url" && !inputItem.validity.valid) {
    inputItem.setCustomValidity("Введите адрес сайта.");
  }
  if (!inputItem.validity.valid) {
    showValidationError(
      // Наконец-то вызываем функцию, чтобы она показала кастомное сообщение
      formItem,
      inputItem,
      inputItem.validationMessage,
      settings
    );
  } else {
    hideValidationError(formItem, inputItem, settings); // А если форма валидна, то убираем все подчеркивания и ошибки
  }
};

// Функция проверки всех input, передаем в функцию форму и объект с данными
const setEventListeners = function (formItem, settings) {
  const inputList = Array.from(
    formItem.querySelectorAll(settings.inputSelector)
  ); // Находим в выбранной форме все инпуты
  const buttonItem = formItem.querySelector(settings.submitButtonSelector); // Берем нужную кнопку отправки формы
  toggleButtonState(formItem, buttonItem, settings); // Вызываем функцию активации сабмит кнопки до валидации, чтобы была неактивна в начале

  inputList.forEach((inputItem) => {
    // Для каждого инпута ставим слушатель ввода символов
    inputItem.addEventListener("input", function () {
      checkInputValidity(formItem, inputItem, settings); // Проверяем импут на валидность
      toggleButtonState(formItem, buttonItem, settings); // Вызываем функцию активации сабмит кнопки после валидации
    });
  });
};

// Функция обхода input на ошибки
const hasInvalidInput = function (inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
};

// Главная функция запуска проверки валидации
export const enableValidationCheck = function (settings) {
  // Передаем ей объект с данными
  const formList = Array.from(document.querySelectorAll(settings.formSelector)); // Ищем все формы
  formList.forEach((formItem) => {
    // Для каждой формы вызываем функцию вешающую слушатели на все импуты))))
    setEventListeners(formItem, settings);
  });
};

// Функция активации submit кнопки после валидации
const toggleButtonState = function (formItem, buttonItem, settings) {
  const inputList = Array.from(
    formItem.querySelectorAll(settings.inputSelector) // Берем у формы все инпуты с .popup__input
  );
  if (hasInvalidInput(inputList)) {
    // Если хоть один инпут в инпут листе невалидный
    buttonItem.setAttribute("disabled", true); // Заблочь кнопку
    buttonItem.classList.add(settings.inactiveButtonClass); // И покрась ее в нужный цвет
  } else {
    buttonItem.removeAttribute("disabled"); // Иначе, сделай кнопку активной
    buttonItem.classList.remove(settings.inactiveButtonClass); // И верни ей здоровый вид
  }
};

// Функция, которую вызывает перед открытием модалки, чтобы очистить все ошибки
export const clearValidation = function (formItem, buttonItem, settings) {
  const inputs = formItem.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    input.classList.remove(settings.inputErrorClass);
    const errorItem = formItem.querySelector(`.${input.id}-error`);
    if (errorItem) {
      errorItem.textContent = "";
    }
  });
  buttonItem.classList.add("popup__submit_disabled");
  buttonItem.setAttribute("disabled", "true");
};
