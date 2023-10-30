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

// getting avatar file input and iserting it into preview

const readFileAvatar = (input) => {
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (evt) => {
    userAvatarPreview.innerHTML = `<img src="${evt.target.result}" alt="Аватар пользователя" width="40" height="44">`;
  };
};

userAvatarInput.addEventListener('input', () => {
  readFileAvatar(userAvatarInput);
});

// getting place file input and iserting it into preview

const readFilePlace = (input) => {
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (evt) => {
    placePhotoPreview.innerHTML = `<img src="${evt.target.result}" alt="Фото жилья" width="70" height="70">`;
  };
};

placePhotoInput.addEventListener('input', () => {
  readFilePlace(placePhotoInput);
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

const priceForPlace = (type, price) => {
  switch(type) {
    case 'bungalow':
      price.setAttribute('min', '0');
      price.setAttribute('placeholder', 'от 0');
      break;
    case 'flat':
      price.setAttribute('min', '1000');
      price.setAttribute('placeholder', 'от 1000');
      break;
    case 'hotel':
      price.setAttribute('min', '3000');
      price.setAttribute('placeholder', 'от 3000');
      break;
    case 'house':
      price.setAttribute('min', '5000');
      price.setAttribute('placeholder', 'от 5000');
      break;
    case 'palace':
      price.setAttribute('min', '10000');
      price.setAttribute('placeholder', 'от 10000');
      break;
  }
};

typeInput.addEventListener('input', (evt) => {
  optionSelectSetter(typeInput, evt);
  priceForPlace(typeInput.value, priceInput);
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

// const synchronizeTime = (chosenTime, synchronisedTime) => {
//   const options = synchronisedTime.options;
//   for (let i = 0; i < options.length; i++) {
//     if (options[i].value === chosenTime) {
//       options[i].setAttribute('selected', 'true');
//     } else {
//       options[i].removeAttribute('selected');
//     }
//   }
// };

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
  console.log(hasEnoughRoom(roomsInput.value, guestsInput.value));

})

guestsInput.addEventListener('input', (evt) => {
  optionSelectSetter(guestsInput, evt);
  console.log(hasEnoughRoom(roomsInput.value, guestsInput.value));
});
