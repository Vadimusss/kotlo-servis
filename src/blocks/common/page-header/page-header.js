/* eslint-disable no-undef */
import debounce from '../../../utils';

const makeFitHeader = () => {
  const header = document.querySelector('.page-header__main-header_major');
  header.style.fontSize = '';
  const currentFontSize = parseFloat(getComputedStyle(header, false).getPropertyValue('font-size'));
  const { length } = header.textContent;
  const multipliers = [0.83, 0.72, 0.6, 0.55, 0.5, 0.46];

  if (length > 6) {
    header.style.fontSize = `${currentFontSize * multipliers[length - 7]}px`;
  }
};

const showFixedMenu = () => {
  const menu = document.querySelector('.page-header_fixed');

  if (!menu) {
    return;
  }

  const header = document.querySelector('.page-header:not(.page-header_fixed)');
  const keyHight = header.offsetHeight - 164;

  if (window.pageYOffset > keyHight) {
    menu.classList.add('page-header_fixed_visible');
  } else {
    menu.classList.remove('page-header_fixed_visible');
  }
};

const initMobileMenu = () => {
  const menuTop = document.querySelector('.page-header__main-menu:not(.page-header__main-menu_fixed)');
  const buttonTop = document.querySelector('.page-header__main-menu-botton:not(.page-header__main-menu-botton_fixed)');
  const menuFixed = document.querySelector('.page-header__main-menu_fixed');
  const buttonFixed = document.querySelector('.page-header__main-menu-botton_fixed');

  if (menuTop && buttonTop) {
    buttonTop.addEventListener('click', () => {
      menuTop.classList.toggle('page-header__main-menu_open');
      buttonTop.classList.toggle('main-menu-button_close');
    });
  }

  if (menuFixed && buttonFixed) {
    buttonFixed.addEventListener('click', () => {
      menuFixed.classList.toggle('page-header__main-menu_open');
      buttonFixed.classList.toggle('main-menu-button_close');
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', debounce(makeFitHeader, 100));
  window.addEventListener('scroll', debounce(showFixedMenu, 100));
});
window.addEventListener('DOMContentLoaded', initMobileMenu);
window.addEventListener('DOMContentLoaded', makeFitHeader);
