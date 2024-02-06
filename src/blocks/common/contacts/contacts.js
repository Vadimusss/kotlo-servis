/* eslint-disable no-undef */
import debounce from '../../../utils';

const setMapCenter = (map) => {
  const width = window.innerWidth;
  if (width > 1435) {
    map.setCenter([55.8138, 37.4980]);
  } else if (width > 1110) {
    map.setCenter([55.8138, 37.4930]);
  } else if (width > 870) {
    map.setCenter([55.8138, 37.4910]);
  } else {
    map.setCenter([55.8138, 37.4900]);
  }
};

const init = () => {
  const myMap = new ymaps.Map('contacts__map', {
    center: [55.8138, 37.4980],
    zoom: 15,
  });

  const officePlacemark = new ymaps.Placemark([55.813876, 37.490827], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'https://kotlo-servis.ru/wp-content/themes/kotlo-servis/img/contacts__office-icon.png',
    iconImageSize: [50, 70],
    iconImageOffset: [-20, -68],
  });

  myMap.geoObjects.add(officePlacemark);
  setMapCenter(myMap);
  return myMap;
};

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('contacts__map');

  let mapLoaded = false;
  function startLazyMap() {
    if (!mapLoaded) {
      mapLoaded = true;
      if (typeof ymaps === 'undefined') {
        const ymapApiScript = document.createElement('script');
        ymapApiScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=a072abfb-f727-4a13-97a7-61fc775866d0&load=package.standard');
        mapContainer.appendChild(ymapApiScript);
      }

      setTimeout(() => {
        ymaps.ready(() => {
          const map = init();
          window.addEventListener('resize', debounce(() => {
            setMapCenter(map);
          }, 300));
        });
      }, 500);

      mapContainer.removeEventListener('mouseover', startLazyMap);
      mapContainer.removeEventListener('touchstart', startLazyMap);
    }
  }

  mapContainer.addEventListener('mouseover', startLazyMap);
  mapContainer.addEventListener('touchstart', startLazyMap);
}, false);
