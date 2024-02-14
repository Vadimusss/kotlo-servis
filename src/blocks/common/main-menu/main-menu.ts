/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const categoryItems = document.querySelectorAll('.main-menu__item_category');
  if (categoryItems.length !== 0) {
    categoryItems.forEach((menuItem) => {
      const subMenu = menuItem.querySelector('ul');
      const otherItems = [...categoryItems].filter((item) => item !== menuItem);

      menuItem.addEventListener('click', () => {
        if (otherItems.length !== 0) {
          otherItems.forEach((otherItem) => {
            otherItem.classList.remove('main-menu__item_category_open');
            otherItem.querySelector('ul')?.classList.remove('main-menu__sub-menu_open');
          });
        }
        menuItem.classList.toggle('main-menu__item_category_open');
        subMenu?.classList.toggle('main-menu__sub-menu_open');
      });
    });
  }

  const mainMenu = document.querySelector('.main-menu');
  if (mainMenu !== null) {
    const links = [...mainMenu.querySelectorAll('a')];
    const twoLastLinks = links.slice(-2);

    if (twoLastLinks.length === 2) {
      twoLastLinks.forEach((link) => {
        link.classList.add('main-menu__link_over-image');
      });
    }
  }
}, false);
