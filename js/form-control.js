import { optionSelectSetter, params, typesDictionary} from './utils.js';
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

const roomsInput = document.querySelector('#room_number');
const guestsInput = document.querySelector('#capacity');

const typeInput = document.getElementById('type');
const priceInput = document.getElementById('price');

const checkInTimeInput = document.getElementById('timein');
const checkOutTimeInput = document.getElementById('timeout');

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

// ----------------------------------------------------------------form validation
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element__error'
}
);

const hasEnoughRoom = () => {
  const rooms = parseInt(roomsInput.value, 10);
  const guests = parseInt(guestsInput.value, 10);
  let enough = false;
  if ((rooms === 100 && guests !== 0)) {
    enough = false;
  } else if(guests <= rooms) {
    enough = true;
  }
  return enough;
};

const isExpensiveEnough = () => {
  const type = typeInput.value;
  const price = parseInt(priceInput.value, 10);
  const expensiveEnough = minPrices[type] <= price;
  return expensiveEnough;
};

const getPriceError = () => {
  const error = `${typesDictionary[typeInput.value]} стоит не меньше ${minPrices[typeInput.value]}`;
  return error;
};

pristine.addValidator(
  guestsInput,
  hasEnoughRoom,
  'Не достаточно места для стольких гостей'
);

pristine.addValidator(
  priceInput,
  isExpensiveEnough,
  getPriceError
);

const onRoomsChange = () => {
  pristine.validate(guestsInput);
};

// const isProperTitle = () => {
//   const title = form.querySelector('#title');
//   const titleRegExp = /[А-Яа-яЁёa-zA-Z\d\s!.,:;)(""]{30,100}/;
//   const properTitle = titleRegExp.test(title.value);
//   return properTitle;
// };

// pristine.addValidator(
//   form.querySelector('#title'),
//   isProperTitle,
//   'Название должно быть не короче 30 символов'
// );

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

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

//----------------------------------------------------------------------- type of placement and price connection

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

//----------------------------------------------------------------------- check-in and check-out time connection

const onCheckInTimeInputChange = (evt) => {
  optionSelectSetter(checkOutTimeInput, evt);
  optionSelectSetter(checkInTimeInput, evt);
};
const onCheckOutTimeInputChange = (evt) => {
  optionSelectSetter(checkOutTimeInput, evt);
  optionSelectSetter(checkInTimeInput, evt);
};

// rooms and guests amount connection

roomsInput.addEventListener('input', (evt) => {
  optionSelectSetter(roomsInput, evt);
});

guestsInput.addEventListener('input', (evt) => {
  optionSelectSetter(guestsInput, evt);
});

//---------------------------------------------------------------------------- form conditions controls

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
  form.addEventListener('submit', onFormSubmit);
  roomsInput.addEventListener('change', onRoomsChange);
  mapFilters.classList.remove('map__filters--disabled');
  mapSelects.forEach((select) => {
    select.removeAttribute('disabled');
  });
  mapFieldset.removeAttribute('disabled');

  // ---------------------------------------------------------------------------uploading previews

  userAvatarInput.addEventListener('input', onUserAvatarInput);

  placePhotoInput.addEventListener('input', onPlacePhotoInput);

  // ------------------------------------------------------------------- setting default values

  const types = typeInput.options;
  for (const type of types) {
    if (type.value === 'flat') {
      type.setAttribute('selected', 'true');
    }
  }

  priceInput.setAttribute('placeholder', 'от 1000');
  priceInput.setAttribute('min', '1000');
  // -------------------------------------------------------type of placing and price connection

  typeInput.addEventListener('input', onTypeInputChange );

  //----------------------------------------------------------- check-in-out times connection

  checkInTimeInput.addEventListener('input', onCheckInTimeInputChange );
  checkOutTimeInput.addEventListener('input', onCheckOutTimeInputChange);
};

export {enableForms, disableForms};
