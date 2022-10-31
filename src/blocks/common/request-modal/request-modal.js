/* eslint-disable no-undef */
import 'jquery-modal/jquery.modal';
import 'jquery-modal/jquery.modal.css';

document.addEventListener('DOMContentLoaded', () => {
  $.modal.defaults = {
    escapeClose: true,
    clickClose: true,
    showClose: true,
    blockerClass: 'request-modal__blocker', // CSS class added to the overlay (blocker).
  };

  const modal = document.getElementById('request-modal');
  modal.addEventListener('wpcf7mailsent', () => {
    setTimeout(() => $.modal.close(), 2000);
  });
}, false);
