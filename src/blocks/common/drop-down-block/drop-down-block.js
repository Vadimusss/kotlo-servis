/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.drop-down-block__button');
  if (buttons.length > 0) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const contentBlock = button.nextElementSibling;

        button.classList.toggle('drop-down-block__button_open');
        contentBlock.classList.toggle('drop-down-block__content_open');
      });
    });
  }
}, false);
