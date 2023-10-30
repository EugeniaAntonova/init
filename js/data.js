import { getRandomFloat, getRandomInteger } from './utils.js';

const ADS_COUNT = 10;
const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const checkTime = ['12:00', '13:00', '14:00'];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const descriptionPhrases = [
  'Comfortable and very ineteresting place with own history.',
  'Quiet neighbours.', 'Friendly surrounding with safe environment.',
  'Family friendly interrier.',
  'Your children and animals will be pleased to destroy our beautiful furniture!'
];
const photosUrls = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function createUniqueNumberGenerator (min, max) {
  const previousNumbers = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousNumbers.length >= max - min + 1) {
      return null;
    }
    while (previousNumbers.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousNumbers.push(currentValue);
    return currentValue;
  };
}
const uniqueNumber = createUniqueNumberGenerator(1, 10);

function getAvatarUrl() {
  const urlNumber = (`0${uniqueNumber()}`).slice(-2);
  const avatarUrl = `img/avatars/user${urlNumber}.png`;
  return avatarUrl;
}

function getRandomItem (someArray) {
  const arrayItem = someArray[getRandomInteger(0, someArray.length - 1)];
  return arrayItem;
}

function getStringArray (items) {
  const stringArray = [];
  const stringArrayLength = getRandomInteger(1, items.length);
  for (let i = 0; i < stringArrayLength; i++) {
    const item = getRandomItem(items);
    if (!stringArray.includes(item)) {
      stringArray.push(item);
    }
  }
  return stringArray;
}

function createAd () {
  const type = getRandomItem(types);
  const lat = getRandomFloat(35.65000, 35.70000, 5);
  const lng = getRandomFloat(139.70000, 139.80000, 5);
  return {
    author: {avatar: getAvatarUrl()},
    offer: {
      title: `Take a look at our ${type}!`,
      address: `${lat}, ${lng}`,
      price: getRandomInteger(500, 10000),
      type: type,
      rooms: getRandomInteger(1, 20),
      guests: getRandomInteger(1, 100),
      checkin: getRandomItem(checkTime),
      checkout: getRandomItem(checkTime),
      features: getStringArray(features),
      description: getStringArray(descriptionPhrases),
      photos: getStringArray(photosUrls),
      location: {
        lat: lat,
        lng: lng,
      }
    }
  };
}

const adsArray = () => Array.from({length: ADS_COUNT}, createAd);

export {adsArray};
