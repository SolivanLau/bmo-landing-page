const menuButton = document.querySelector('.header__menu');

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('active');
  document.body.classList.toggle('overlay--active');
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !isExpanded);
});