/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.brands');
  const tabBtns = document.querySelectorAll('.brands__list-item');
  const tabsContent = document.querySelectorAll('.brands__tab');

  const tabsHandler = (path: string) => {
    tabsContent.forEach((element) => element.classList.remove('brands__tab_active'));
    document.querySelector(`[data-tab-target="${path}"]`).classList.add('brands__tab_active');
  };

  if (container && tabBtns && tabsContent) {
    container.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement && target.classList.contains('brands__list-item')) {
        const { tabPath } = target.dataset;
        tabBtns.forEach((element) => element.classList.remove('brands__list-item_active'));
        document.querySelector(`[data-tab-path="${tabPath}"]`).classList.add('brands__list-item_active');
        tabsHandler(tabPath);
      }
    });
  }
});
