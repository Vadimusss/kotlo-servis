/* eslint-disable no-undef */
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

document.addEventListener('DOMContentLoaded', () => {
  $('.owl-carousel').owlCarousel({
    loop: true,
    autoplay: false,
    margin: 0,
    nav: true,
    navText: false,
    dots: false,
    items: 1,
    navClass: ['reviews__slider-button reviews__slider-button_type_prev', 'reviews__slider-button reviews__slider-button_type_next'],
  });
}, false);
