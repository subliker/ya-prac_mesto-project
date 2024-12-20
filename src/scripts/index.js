import '../pages/index.css';

import { initialCards } from './cards.js';
import { openModal, closeModal } from '../components/modal.js'
import { createCardElement } from '../components/card.js';
import { enableValidation } from '../components/validate.js';
import { getUserInfo, getInitialCards, updateUserInfo, updateAvatar, createCard } from '../components/api.js'; 

let currentUser = null

function handleAvatarFormSubmit(event) {
    event.preventDefault();

    submitAvatarButton.textContent = 'Сохранение...'; 
    submitAvatarButton.disabled = true; 

    const avatar = avatarUrl.value

    updateAvatar(avatar)
    .then(u=>{
        userAvatar.style.backgroundImage = "url("+u.avatar+")"
        closeModal(avatarPopup)
    })
    .catch(err => console.error(err))
    .finally(() => { 
        submitAvatarButton.textContent = 'Сохранить'; 
        submitAvatarButton.disabled = false; 
    }); 
}

const userAvatar = document.querySelector(".profile__image")

const editAvatarButton = document.querySelector(".profile__image")

const avatarPopup = document.querySelector('.popup_type_avatar')

const avatarForm = avatarPopup.querySelector(".popup__form")

const avatarUrl = avatarForm.querySelector(".popup__input_type_url")

const closeAvatarButton = avatarPopup.querySelector('.popup__close')
const submitAvatarButton = avatarPopup.querySelector('.popup__button')

editAvatarButton.addEventListener('click', () => {
    if (userAvatar.src){
        avatarUrl.value = userAvatar.src
    }

    openModal(avatarPopup);
})
console.log(avatarForm)
console.log(closeAvatarButton)
closeAvatarButton.addEventListener('click', () => closeModal(avatarPopup));

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

function handleProfileFormSubmit(event) {
    event.preventDefault();

    submitProfileButton.textContent = 'Сохранение...'; 
    submitProfileButton.disabled = true; 

    const name = profileNameInput.value; 
    const about = profileTextInput.value; 

    updateUserInfo(name, about) 
    .then(u => { 
        userName.textContent = u.name; 
        userText.textContent = u.about; 
        closeModal(profilePopup); 
    }) 
    .catch(err => console.error(err)) 
    .finally(() => { 
        submitProfileButton.textContent = 'Сохранить'; 
        submitProfileButton.disabled = false; 
    }); 
}

const userName = document.querySelector('.profile__title');
const userText = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_edit');

const profileForm = profilePopup.querySelector('.popup__form');

const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileTextInput = profilePopup.querySelector('.popup__input_type_description');
const closeProfileButton = profilePopup.querySelector('.popup__close');
const submitProfileButton = profilePopup.querySelector('.popup__button')

editProfileButton.addEventListener('click', () => {
    profileNameInput.value = userName.textContent;
    profileTextInput.value = userText.textContent;

    openModal(profilePopup);
});

closeProfileButton.addEventListener('click', () => closeModal(profilePopup));

profileForm.addEventListener('submit', handleProfileFormSubmit);

const imagePopup = document.querySelector('.popup_type_image');

const imageImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');
const closeImageButton = imagePopup.querySelector('.popup__close');

closeImageButton.addEventListener('click', () => closeModal(imagePopup));

const cardsList = document.querySelector('.places__list');

function handleCardFormSubmit(event) {
    event.preventDefault(); 

    cardSubmitButton.textContent = 'Сохранение...'; 
    cardSubmitButton.disabled = true; 

    const name = cardNameInput.value; 
    const link = cardLinkInput.value; 

    createCard(name, link) 
        .then(c => { 
            const cardElement = createCardElement(c.name, c.link); 
            cardsList.prepend(cardElement); 
            closeModal(cardPopup); 
        }) 
        .catch(err => console.error(err)) 
        .finally(() => { 
            cardSubmitButton.textContent = 'Сохранить'; 
            cardSubmitButton.disabled = false; 
        }); 
}

const addCardButton = document.querySelector('.profile__add-button');

const cardPopup = document.querySelector('.popup_type_new-card');
const cardFrom = cardPopup.querySelector('.popup__form');

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const closeCardButton = cardPopup.querySelector('.popup__close');
const cardSubmitButton = cardPopup.querySelector('.popup__button')

addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';

    openModal(cardPopup);
});

closeCardButton.addEventListener('click', () => closeModal(cardPopup));
cardFrom.addEventListener('submit', handleCardFormSubmit);

cardsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
        imageImage.setAttribute('src', event.target.src);
        imageCaption.textContent = event.target.alt;

        openModal(imagePopup);
    }
});

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
avatarPopup.classList.add('popup_is-animated');

const validationSettings = {
    formClass: '.popup__form', 
    inputClass: '.popup__input', 
    inputErrorClass: 'popup__input_error',
    buttonClass: '.popup__button', 
    buttonInactiveClass: 'popup__button_inactive', 
    errorClass: 'popup__error-text_active' 
};

enableValidation(validationSettings);

Promise.all([getUserInfo(), getInitialCards()]) 
    .then(([user, cards]) => { 
        currentUser = user; 
        userName.textContent = user.name; 
        userText.textContent = user.about; 
        userAvatar.style.backgroundImage = `url(${user.avatar})`; 

        cards.forEach(cardData => { 
            const cardElement = createCardElement(cardData, currentUser);
            cardsList.appendChild(cardElement); 
        }); 
    }) 
    .catch(err => console.error('Ошибка при загрузке данных:', err)); 