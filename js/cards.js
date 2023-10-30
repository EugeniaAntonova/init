/* eslint-disable no-unused-expressions */
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardContainer = document.querySelector('#map-canvas');

const getOffer = ({offer, author}) => {
  const typesDictionary = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель'
  };

  const newOffer = cardTemplate.cloneNode(true);
  newOffer.querySelector('.popup__title').textContent = offer.title;
  newOffer.querySelector('.popup__text--address').textContent = offer.address;
  newOffer.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  newOffer.querySelector('.popup__type').textContent = `${typesDictionary[offer.type]}`;
  newOffer.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей.`;
  newOffer.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;

  const featuresList = newOffer.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (let i = 0; i < offer.features.length; i++) {
    const featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature');
    featuresItem.classList.add(`popup__feature--${offer.features[i]}`);
    featuresList.appendChild(featuresItem);
  }

  const description = newOffer.querySelector('.popup__description');
  if (!offer.description) {
    description.classList.add('hidden');
  } else {
    description.textContent = offer.description.join(' ');
  }

  const photosContainer = newOffer.querySelector('.popup__photos');
  const photo = newOffer.querySelector('.popup__photo');
  for (let j = 0; j < offer.photos.length; j++) {
    photo.src = offer.photos[j];
    photosContainer.appendChild(photo);
  }
  newOffer.querySelector('.popup__avatar').src = author.avatar;

  return newOffer;
};

const renderOffer = (offers) => {
  const offerFragment = document.createDocumentFragment();
  const offer = getOffer(offers[0]);
  offerFragment.appendChild(offer);
  cardContainer.appendChild(offerFragment);
};

export {renderOffer};
