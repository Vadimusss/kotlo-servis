/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

interface JQueryStatic {
	modal: {
    defaults: {
      escapeClose: boolean;
      clickClose: boolean;
      showClose: boolean;
      blockerClass: string;
    },
    close(): void;
  };
}