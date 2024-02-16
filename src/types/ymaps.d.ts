/// <reference path="../../node_modules/@types/yandex-maps/index.d.ts" />

declare module ymaps {

  export interface IGeometry {

    getCoordinates(): number[];
  }

  export interface IControl {

    options: {

      set(type: string, { left, top }: { left: string, top: string }): void; 
    }
  }
}