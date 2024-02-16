/* eslint-disable no-undef */
import data from './objects.json';
import debounce from '../../../utils';

const setZoomControlPosition = (map: ymaps.Map) => {
  const width = window.innerWidth;
  let contentWidth = '';
  let offsetRight = '40px';

  const manager = new ymaps.control.Manager(map);

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
    manager.add('zoomControl', {
      position: {
        left: '20px',
        top: '40px',
      },
    });

    return;
  }

  manager.add('zoomControl', {
    position: {
      left: `calc((100vw - ${contentWidth}) / 2 + ${offsetRight})`,
      top: '40px',
    },
  });
};

const init = () => {
  const map = new ymaps.Map('objects__map', {
    center: [55.75399, 37.62209],
    zoom: 8,
  });

  const objectManager = new ymaps.ObjectManager({
    clusterize: true,
    gridSize: 32,
    clusterDisableClickZoom: true,
  });

  objectManager.objects.options.set('preset', 'islands#blackRepairShopIcon');
  objectManager.clusters.options.set('preset', 'islands#blackClusterIcons');
  map.geoObjects.add(objectManager);

  objectManager.add(data);

  setZoomControlPosition(map);
  return map;
};

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('objects__map');
  const objectsListWrapper = document.querySelector('.objects__list-wrapper');

  let mapLoaded = false;
  function startLazyMap() {
    if (!mapLoaded) {
      mapLoaded = true;
      console.log(`1 ===> ${mapLoaded}`);
      if (typeof ymaps === 'undefined') {
        console.log(`2 ===> ${mapLoaded}`);
        const ymapApiScript = document.createElement('script');
        ymapApiScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=a072abfb-f727-4a13-97a7-61fc775866d0&load=package.standard');
        mapContainer?.appendChild(ymapApiScript);
      }
      setTimeout(() => {
        ymaps.ready(() => {
          const map = init();

          window.addEventListener('resize', debounce(() => {
            setZoomControlPosition(map);
          }, 300));

          const localities = document.querySelectorAll('.objects__list-item');

          if (localities.length !== 0) {
            localities.forEach((locality) => {
              const localityName = locality.textContent;

              locality.addEventListener('click', async () => {
                try {
                  const allFoundLocalities = await ymaps.geocode(`Московская область, ${localityName}`);
                  const firstFoundCoords = allFoundLocalities?.geoObjects?.get(0)
                    .geometry?.getCoordinates();

                  if (firstFoundCoords !== undefined) {
                    map.setCenter(firstFoundCoords);
                    map.setZoom(11);
                  }
                } catch (e) {
                  console.log('Ошибка геокодирования');
                }
              });
            });
          }
        });
      }, 500);

      mapContainer?.removeEventListener('mouseover', startLazyMap);
      mapContainer?.removeEventListener('touchstart', startLazyMap);
      objectsListWrapper?.removeEventListener('mouseover', startLazyMap);
      objectsListWrapper?.removeEventListener('touchstart', startLazyMap);
    }
  }

  mapContainer?.addEventListener('mouseover', startLazyMap);
  mapContainer?.addEventListener('touchstart', startLazyMap);
  objectsListWrapper?.addEventListener('mouseover', startLazyMap);
  objectsListWrapper?.addEventListener('touchstart', startLazyMap);
}, false);
