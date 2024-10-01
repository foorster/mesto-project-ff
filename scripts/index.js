const placesList =  document.querySelector('.places__list');


function createCard(name, link, deleteCard){
    cardTemplate = document.querySelector('#card-template').content;
    cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (deleteButton){
    deleteButton.addEventListener("click", deleteCard);}

    return cardElement;
}


initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link, deleteCard);
    placesList.append(cardElement);
});

function deleteCard (event) { 
  event.target.closest(".card").remove(); 
};