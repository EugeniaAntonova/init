// первый рандомайзер до целого
// фишку с абсолютными значениями брала из ответа. до этого, если число было отрицательное, я возвращала ноль
function getRandomInteger (a, b) {
  let randomInteger = 0;
  const startPoint = Math.min(Math.abs(a), Math.abs(b));
  const endPoint = Math.max(Math.abs(a), Math.abs(b));
  if (startPoint === endPoint) {
    randomInteger = startPoint;
  }
  randomInteger = Math.round((Math.random()*(endPoint - startPoint)) + startPoint);
  return randomInteger;
}
// второй рандомайзер до скольких-то чисел после запятой
function getRandomFloat (a, b, afterDot) {
  let randomFloat = 0;
  const startPoint = Math.min(Math.abs(a), Math.abs(b));
  const endPoint = Math.max(Math.abs(a), Math.abs(b));
  if (startPoint === endPoint) {
    randomFloat = startPoint;
  }
  randomFloat = ((Math.random()*(startPoint - endPoint)) + endPoint).toFixed(afterDot);
  return randomFloat;
}

const optionSelectSetter = (select, evt) => {
  const options = select.options;
  const value = evt.target.value;
  for (const option of options) {
    if (option.value === value) {
      option.selected = true;
    }
  }
};

const typesDictionary = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

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

export {getRandomInteger, getRandomFloat, optionSelectSetter, params, typesDictionary};
