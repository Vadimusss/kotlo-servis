/* eslint-disable no-undef */
import debounce from '../../../utils';

const makeFitHeader = () => {
  const width = document.documentElement.clientWidth;
  const header = document.querySelector('.page-header__main-header_major');
  header.style.fontSize = '';
  const { length } = header.textContent;
  if (width > 1435 || length <= 7) {
    return;
  }

  const currentFontSize = parseFloat(getComputedStyle(header, false).getPropertyValue('font-size'));

  if (width > 1110) {
    header.style.fontSize = `${currentFontSize - 20 * (length - 7)}px`;
  } else if (width > 648) {
    header.style.fontSize = `${currentFontSize - 7 * (length - 7)}px`;
  }
};

const initMobileMenu = () => {
  const menu = document.querySelector('.page-header__main-menu');
  const button = document.querySelector('.page-header__main-menu-botton');

  if (menu && button) {
    button.addEventListener('click', () => {
      menu.classList.toggle('page-header__main-menu_open');
      button.classList.toggle('main-menu-button_close');
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  makeFitHeader();
  initMobileMenu();
  window.addEventListener('resize', debounce(makeFitHeader, 100));
});
