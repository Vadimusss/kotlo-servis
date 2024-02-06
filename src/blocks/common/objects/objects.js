/* eslint-disable no-undef */
import data from './objects.json';
import debounce from '../../../utils';

const setZoomControlPosition = (control) => {
  const width = window.innerWidth;
  let contentWidth = '';
  let offsetRight = '40px';

  if (width > 1435) {
    contentWidth = '1342px';
  } else if (width > 1110) {
    contentWidth = '1000px';
  } else if (width > 870) {
    contentWidth = '640px';
    offsetRight = '20px';
  } else if (width > 648) {
    contentWidth = '640px';
    offsetRight = '20px';
  } else {
    control.options.set('position', {
      left: '20px',
      top: '40px',
    });

    return;
  }

  control.options.set('position', {
    left: `calc((100vw - ${contentWidth}) / 2 + ${offsetRight})`,
    top: '40px',
  });
};

const init = () => {
  const map = new ymaps.Map('objects__map', {
    center: [55.75399, 37.62209],
    zoom: 8,
    controls: ['zoomControl'],
  });

  const zoomControl = map.controls.get('zoomControl');

  const objectManager = new ymaps.ObjectManager({
    clusterize: true,
    gridSize: 32,
    clusterDisableClickZoom: true,
  });

  objectManager.objects.options.set('preset', 'islands#blackRepairShopIcon');
  objectManager.clusters.options.set('preset', 'islands#blackClusterIcons');
  map.geoObjects.add(objectManager);

  objectManager.add(data);

  setZoomControlPosition(zoomControl);
  return { map, zoomControl };
};

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('objects__map');
  const objectsListWrapper = document.querySelector('.objects__list-wrapper');

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
          const { map, zoomControl } = init();

          window.addEventListener('resize', debounce(() => {
            setZoomControlPosition(zoomControl);
          }, 300));

          const localities = document.querySelectorAll('.objects__list-item');

          if (localities.length !== 0) {
            localities.forEach((locality) => {
              const localityName = locality.textContent;

              locality.addEventListener('click', async () => {
                try {
                  const allFoundLocalities = await ymaps.geocode(`Московская область, ${localityName}`);
                  const firstFoundCoords = allFoundLocalities
                    .geoObjects.get(0).geometry.getCoordinates();

                  map.setCenter(firstFoundCoords);
                  map.setZoom(11);
                } catch ({ name, message }) {
                  console.log(`Ошибка геокодирования\nError name ==> ${name}\nError message ==> ${message}`);
                }
              });
            });
          }
        });
      }, 500);

      mapContainer.removeEventListener('mouseover', startLazyMap);
      mapContainer.removeEventListener('touchstart', startLazyMap);
      objectsListWrapper.removeEventListener('mouseover', startLazyMap);
      objectsListWrapper.removeEventListener('touchstart', startLazyMap);
    }
  }

  mapContainer.addEventListener('mouseover', startLazyMap);
  mapContainer.addEventListener('touchstart', startLazyMap);
  objectsListWrapper.addEventListener('mouseover', startLazyMap);
  objectsListWrapper.addEventListener('touchstart', startLazyMap);
}, false);
