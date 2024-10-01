function addCard(){
    document.querySelector('.places__list').append(cardElement);
}

for (let i=0; i<initialCards.length; i++){
    cardTemplate = document.querySelector('#card-template').content;
    cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__title').textContent = initialCards[i].name;
    addCard()
}

delElement = document.querySelectorAll('.card__delete-button');
arrDelElement = Array.from(delElement);

for (let i=0; i<arrDelElement.length; i++){
    arrDelElement[i].addEventListener('click', () => {
    const listItem = arrDelElement[i].closest('.places__item');
    listItem.remove(); 
  })
}