declare module ymaps {
  export function ready(callback: () => void): Promise;

  class Promise {
    then(onFulfilled?: Function, onRejected?: Function, onProgress?: Function, ctx?: any): Promise;
  }

  export class Placemark {
    constructor(coordinates: Number[], {}: {}, {}:
      {
        iconLayout: string,
        iconImageHref: string,
        iconImageSize: Number[],
        iconImageOffset: Number[],
      }
    )
  }

  export class GeoObjects {
    add(child: Placemark): void;
  }

  export class Map {
    constructor(selector: string, state: MapState);

    setCenter(coordinates: Number[]): void;
    geoObjects: GeoObjects;
  }

  export class MapState {
    center: number[];
    controls?: string[];
    zoom: number;
  }
}