/* eslint-disable max-len */
/* eslint-disable no-undef */
import debounce from '../../../utils';

const showFixedNavBar = () => {
  const navBar = document.querySelector('.fixed-nav-bar');

  if (navBar === null) {
    return;
  }

  const headerHeight = document.querySelector<HTMLElement>('.page-header')?.offsetHeight;
  const showCorrectionPx = 164;
  const keyHight = headerHeight !== undefined ? headerHeight - showCorrectionPx : window.innerHeight;

  if (window.scrollY > keyHight) {
    navBar.classList.add('fixed-nav-bar_visible');
  } else {
    navBar.classList.remove('fixed-nav-bar_visible');
  }
};

const initFixedMobileMenu = () => {
  const menu = document.querySelector('.fixed-nav-bar__menu');
  const button = document.querySelector('.fixed-nav-bar__menu-botton');

  if (menu && button) {
    button.addEventListener('click', () => {
      menu.classList.toggle('fixed-nav-bar__menu_open');
      button.classList.toggle('fixed-nav-bar__menu-botton_close');
      button.classList.toggle('main-menu-button_close');
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initFixedMobileMenu();
  showFixedNavBar();
  window.addEventListener('scroll', debounce(showFixedNavBar, 100));
});
