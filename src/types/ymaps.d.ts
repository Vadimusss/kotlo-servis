/// <reference path="../../node_modules/@types/yandex-maps/index.d.ts" />

declare module ymaps {

  export interface IGeometry {

    customField: string;

    getCoordinates(): number[];
  }
}