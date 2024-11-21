const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')

profilePopup.classList.add('popup_is-animated')
cardPopup.classList.add('popup_is-animated')
imagePopup.classList.add('popup_is-animated')

function openModal(popup) {      
  popup.classList.add('popup_is-opened');
} 

function closeModal(popup) {      
  popup.classList.remove('popup_is-opened');
} 

document.querySelectorAll('.popup__close').forEach((btn)=>{
  btn.addEventListener('click', (evt)=>{
    closeModal(evt.target.closest('.popup'))
  })
})

const profileFormElement = profilePopup.querySelector('.popup__form')
const nameInput = profileFormElement.querySelector('.popup__input_type_name')
const jobInput = profileFormElement.querySelector('.popup__input_type_description')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    let job = jobInput.value
    let name = nameInput.value

    profileDescription.textContent = job
    profileTitle.textContent = name

    closeModal(profilePopup)
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

function popupEditOnClick(){
  nameInput.value =  profileTitle.textContent
  jobInput.value =  profileDescription.textContent
  openModal(profilePopup)
}

document.querySelector('.profile__edit-button').addEventListener('click', popupEditOnClick)

const cardFormElement = cardPopup.querySelector('.popup__form')
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name')
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url')

function handleCardSubmit(evt) {
  evt.preventDefault(); 

  let cardNode = createCard(cardNameInput.value, cardUrlInput.value)
  placesList.insertBefore(cardNode, placesList.firstChild)

  closeModal(cardPopup)
}

cardFormElement.addEventListener('submit', handleCardSubmit); 

function popupAddOnClick(){
  openModal(cardPopup)
}

document.querySelector('.profile__add-button').addEventListener('click', popupAddOnClick)
// document.querySelector('.profile__add-button').addEventListener('click', ()=>openModal(profilePopup))

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];



const cardTemplate = document.querySelector('#card-template').content
const cardItem = cardTemplate.querySelector('.card')

const imagePopupElement = imagePopup.querySelector('.popup__image')
const imagePopupCaption = imagePopup.querySelector('.popup__caption')

function createCard(name, link){
  const cardItemCopy = cardItem.cloneNode(true)

  cardItemCopy.querySelector('.card__title').textContent = name
  cardItemCopy.querySelector('.card__image').src = link

  cardItemCopy.querySelector('.card__like-button').addEventListener('click', (evt)=>{
    evt.target.classList.toggle('card__like-button_is-active')
  })
  cardItemCopy.querySelector('.card__delete-button').addEventListener('click', (evt)=>{
    evt.target.closest('.card').remove()
  })
  cardItemCopy.querySelector('.card__image').addEventListener('click', (evt)=>{
    imagePopupElement.src = link  
    imagePopupCaption.textContent = name
    openModal(imagePopup)
  })
  

  return cardItemCopy
}

const placesList = document.querySelector('.places__list')

function renderInitialCards(){
  initialCards.forEach((card)=>{
    let cardNode = createCard(card.name, card.link)
    placesList.append(cardNode)
  })
}

renderInitialCards()