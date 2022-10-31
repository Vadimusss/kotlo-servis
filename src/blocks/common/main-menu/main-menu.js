/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const categoryItems = document.querySelectorAll('.main-menu__item_category');
  if (categoryItems.length !== 0) {
    categoryItems.forEach((item) => {
      const subMenu = item.querySelector('ul');
      item.addEventListener('click', () => {
        item.classList.toggle('main-menu__item_category_open');
        subMenu.classList.toggle('main-menu__sub-menu_open');
      });
    });
  }

  const mainMenu = document.querySelector('.main-menu');
  const links = [...mainMenu.querySelectorAll('a')];
  const twoLastLinks = links.slice(-2);

  if (twoLastLinks.length === 2) {
    twoLastLinks.forEach((link) => {
      link.classList.add('main-menu__link_over-image');
    });
  }
}, false);
