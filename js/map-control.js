import { enableForms } from './form-control.js';
import { getOffer } from './cards.js';
import { adsArray } from './data.js';
const addressInput = document.querySelector('#address');


// =================================================================creating popups

const makePopup = (ad) => {
  const offer = getOffer(ad);
  return offer;
};

// ===================================================================preparing main marker
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});
const mainMarker = L.marker({
  lat: 35.68950,
  lng: 139.69171,
},
{
  icon: mainPinIcon,
  draggable: true
}
);

// ===================================================================preparing regular markers
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const ads = adsArray();

// ==================================================================cerating map

const makeMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableForms();
    })
    .setView({
      lat: 35.68950,
      lng: 139.69171,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  addressInput.value = '35.68950, 139.69171';

  mainMarker.addTo(map);
  mainMarker.on('move', () => {
    const address = mainMarker.getLatLng();
    addressInput.value = `${Object.values(address).map((it) => it.toFixed(5))}`;
  });

  const markerGroup = L.layerGroup().addTo(map);

  const setMarkers = () => {
    ads.forEach((ad) => {
      const popup = makePopup(ad);
      const marker = L.marker({
        lat: ad.offer.location.lat,
        lng: ad.offer.location.lng
      },
      {
        icon: pinIcon
      });
      marker.addTo(markerGroup).bindPopup(popup);
    });
  };
  setMarkers();
};

export default makeMap;
