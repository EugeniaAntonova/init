import { optionSelectSetter } from './utils.js';
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

userAvatarInput.addEventListener('input', () => {
  readFile('userAvatarInput', userAvatarInput, userAvatarPreview);
});

placePhotoInput.addEventListener('input', () => {
  readFile('placePhotoInput', placePhotoInput, placePhotoPreview);
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

disableForms();

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
};

enableForms();

// type of placement and price connection
const typeInput = document.getElementById('type');
const priceInput = document.getElementById('price');

const params = {
  bungalow: {
    'min': '0',
    'placeholder': 'от 0'
  },
  flat: {
    'min': '1000',
    'placeholder': 'от 1000'
  },
  hotel: {
    'min': '3000',
    'placeholder': 'от 3000'
  },
  house: {
    'min': '5000',
    'placeholder': 'от 5000'
  },
  palace: {
    'min': '10000',
    'placeholder': 'от 10 000'
  }

};

const getParamsValue = (type, price) => {
  const value = params[type];
  Object.keys(value).forEach((key) => {
    price.setAttribute(key, value[key]);
  });
};

typeInput.addEventListener('input', (evt) => {
  optionSelectSetter(typeInput, evt);
  getParamsValue(typeInput.value, priceInput);
});

// ---------- setting default values

const types = typeInput.options;
for (const type of types) {
  if (type.value === 'flat') {
    type.setAttribute('selected', 'true');
  }
}

priceInput.setAttribute('placeholder', 'от 1000');
priceInput.setAttribute('min', '1000');

// check-in and check-out time connection
const checkInTimeInput = document.getElementById('timein');
const checkOutTimeInput = document.getElementById('timeout');

checkInTimeInput.addEventListener('input', (evt) => {
  optionSelectSetter(checkInTimeInput, evt);
  optionSelectSetter(checkOutTimeInput, evt);
});
checkOutTimeInput.addEventListener('input', (evt) => {
  optionSelectSetter(checkOutTimeInput, evt);
  optionSelectSetter(checkInTimeInput, evt);
});

// rooms and guests amount connection
const roomsInput = document.querySelector('#room_number');
const guestsInput = document.querySelector('#capacity');

const hasEnoughRoom = (rooms, guests) => {
  rooms = Number(rooms);
  guests = Number(guests);
  let enough = false;
  if ((rooms === 100 && guests !== 0)) {
    enough = false;
  } else if(guests <= rooms) {
    enough = true;
  }
  return enough;
};

roomsInput.addEventListener('input', (evt) => {
  optionSelectSetter(roomsInput, evt);
});

guestsInput.addEventListener('input', (evt) => {
  optionSelectSetter(guestsInput, evt);
});
