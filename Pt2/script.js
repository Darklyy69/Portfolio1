document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('p');

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 32);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  document.querySelectorAll('[data-image]').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.image;
      lightboxImage.alt = item.dataset.title || '';
      lightboxCaption.textContent = item.dataset.title || '';
      lightbox.showModal();
    });
  });
  const closeLightbox = () => lightbox.close();
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
});
