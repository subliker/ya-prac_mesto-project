import '../pages/index.css';

import { initialCards } from './cards.js';
import { openModal, closeModal } from '../components/modal.js'
import { createCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js';

function handleProfileFormSubmit(event) {
    event.preventDefault(); 

    userName.textContent = profileNameInput.value;
    userText.textContent = profileTextInput.value;

    closeModal(profilePopup);
}

const userName = document.querySelector('.profile__title');
const userText = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_edit');

const profileFrom = profilePopup.querySelector('.popup__form');

const profileNameInput = profilePopup.querySelector('.popup__input_type_name'); // Поле ввода имени
const profileTextInput = profilePopup.querySelector('.popup__input_type_description'); // Поле ввода описания
const closeProfileButton = profilePopup.querySelector('.popup__close'); // Кнопка закрытия попапа

editProfileButton.addEventListener('click', () => {
    profileNameInput.value = userName.textContent;
    profileTextInput.value = userText.textContent;

    openModal(profilePopup);
});

closeProfileButton.addEventListener('click', () => closeModal(profilePopup));

profileFrom.addEventListener('submit', handleProfileFormSubmit);

const imagePopup = document.querySelector('.popup_type_image');

const imageImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');
const closeImageButton = imagePopup.querySelector('.popup__close');

closeImageButton.addEventListener('click', () => closeModal(imagePopup));

const cardsList = document.querySelector('.places__list');

function handleCardFormSubmit(event) {
    event.preventDefault(); 

    cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));

    closeModal(cardPopup);
}

const addCardButton = document.querySelector('.profile__add-button');

const cardPopup = document.querySelector('.popup_type_new-card');
const cardFrom = cardPopup.querySelector('.popup__form');

const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name'); // Поле названия карточки
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url'); // Поле ссылки на изображение
const closeCardButton = cardPopup.querySelector('.popup__close'); // Кнопка закрытия попапа

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

initialCards.forEach((item) => cardsList.append(createCard(item.name, item.link)));

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const validationSettings = {
    formClass: '.popup__form', 
    inputClass: '.popup__input', 
    inputErrorClass: 'popup__input_error',
    buttonClass: '.popup__button', 
    buttonInactiveClass: 'popup__button_inactive', 
    errorClass: 'popup__error-text_active' 
};

enableValidation(validationSettings);