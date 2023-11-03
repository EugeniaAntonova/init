import { optionSelectSetter, params } from './utils.js';
const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset');
// const slider = form.querySelector('.ad-form__slider');
const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');
const mapFieldset = mapFilters.querySelector('fieldset');
// avatar input and preview
const userAvatarInput = document.querySelector('.ad-form-header__input');
const userAvatarPreview = document.querySelector('.ad-form-header__preview');
// place photo input and preview
const placePhotoInput = document.querySelector('.ad-form__input');
const placePhotoPreview = document.querySelector('.ad-form__photo');


// ---------------------reading files and uploading preview
const readFile = (inputName, input, previewPlace) => {
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (evt) => {
    const preview =
    inputName === 'userAvatarInput' ?
      `<img src="${evt.target.result}" alt="Аватар пользователя" width="40" height="44">` :
      `<img src="${evt.target.result}" alt="Фото жилья" width="70" height="70">`;
    previewPlace.innerHTML = preview;
  };
};

const onUserAvatarInput = () => {
  readFile('userAvatarInput', userAvatarInput, userAvatarPreview);
};
const onPlacePhotoInput = () => {
  readFile('placePhotoInput', placePhotoInput, placePhotoPreview);
};

// type of placement and price connection

const typeInput = document.getElementById('type');
const priceInput = document.getElementById('price');

const getParamsValue = (type, price) => {
  const value = params[type];
  Object.keys(value).forEach((key) => {
    price.setAttribute(key, value[key]);
  });
};

const onTypeInputChange = (evt) => {
  optionSelectSetter(typeInput, evt);
  getParamsValue(typeInput.value, priceInput);
};

// check-in and check-out time connection

const checkInTimeInput = document.getElementById('timein');
const checkOutTimeInput = document.getElementById('timeout');

const onCheckInTimeInputChange = (evt) => {
  optionSelectSetter(checkOutTimeInput, evt);
  optionSelectSetter(checkInTimeInput, evt);
};
const onCheckOutTimeInputChange = (evt) => {
  optionSelectSetter(checkOutTimeInput, evt);
  optionSelectSetter(checkInTimeInput, evt);
};

// rooms and guests amount connection

const roomsInput = document.querySelector('#room_number');
const guestsInput = document.querySelector('#capacity');

// const hasEnoughRoom = (rooms, guests) => {
//   rooms = Number(rooms);
//   guests = Number(guests);
//   let enough = false;
//   if ((rooms === 100 && guests !== 0)) {
//     enough = false;
//   } else if(guests <= rooms) {
//     enough = true;
//   }
//   return enough;
// };

roomsInput.addEventListener('input', (evt) => {
  optionSelectSetter(roomsInput, evt);
});

guestsInput.addEventListener('input', (evt) => {
  optionSelectSetter(guestsInput, evt);
});

// form conditions controls

const disableForms = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');
  });
  mapFilters.classList.add('map__filters--disabled');
  mapSelects.forEach((select) => {
    select.setAttribute('disabled', 'disabled');
  });
  mapFieldset.setAttribute('disabled', 'disabled');
};

const enableForms = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapSelects.forEach((select) => {
    select.removeAttribute('disabled');
  });
  mapFieldset.removeAttribute('disabled');

  // ---------uploading previews

  userAvatarInput.addEventListener('input', onUserAvatarInput);

  placePhotoInput.addEventListener('input', onPlacePhotoInput);

  // ---------- setting default values

  const types = typeInput.options;
  for (const type of types) {
    if (type.value === 'flat') {
      type.setAttribute('selected', 'true');
    }
  }

  priceInput.setAttribute('placeholder', 'от 1000');
  priceInput.setAttribute('min', '1000');
  // ----------type of placing and price connection

  typeInput.addEventListener('input', onTypeInputChange );

  //-------- check-in-out times connection

  checkInTimeInput.addEventListener('input', onCheckInTimeInputChange );
  checkOutTimeInput.addEventListener('input', onCheckOutTimeInputChange);
};

export {enableForms, disableForms};
