(() => {
  'use strict';

  const focusableSelector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const trapFocus = (container, event) => {
    if (event.key !== 'Tab') return;

    const focusables = [...container.querySelectorAll(focusableSelector)].filter(
      (item) => item.offsetParent !== null
    );

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const setupModal = ({ modalId, openBtnId, imageMode = false }) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const openBtn = openBtnId ? document.getElementById(openBtnId) : null;
    const closeBtn = modal.querySelector('.close');
    let lastFocus = null;

    const openModal = () => {
      lastFocus = document.activeElement;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');

      const target = modal.querySelector('[autofocus]') || modal.querySelector(focusableSelector);
      target?.focus();
    };

    const closeModal = () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      lastFocus?.focus?.();
    };

    if (openBtn) {
      openBtn.addEventListener('click', openModal);
      openBtn.setAttribute('aria-controls', modalId);
      openBtn.setAttribute('aria-expanded', 'false');
    }

    closeBtn?.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
      if (!modal.classList.contains('show')) return;
      if (event.key === 'Escape') {
        closeModal();
        return;
      }
      trapFocus(modal, event);
    });

    if (imageMode) {
      return {
        openWithImage: (src, alt) => {
          const modalImage = document.getElementById('galleryModalImage');
          if (!modalImage) return;
          modalImage.src = src;
          modalImage.alt = alt;
          openModal();
        }
      };
    }

    return { openModal, closeModal };
  };

  const setupGallery = () => {
    const galleryTriggers = document.querySelectorAll('[data-gallery-trigger]');
    if (!galleryTriggers.length) return;

    const galleryModal = setupModal({ modalId: 'galleryModal', imageMode: true });
    if (!galleryModal) return;

    galleryTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const image = trigger.querySelector('img');
        if (!image) return;
        galleryModal.openWithImage(image.src, image.alt);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupModal({ modalId: 'cadastroModal', openBtnId: 'openModalBtn' });
    setupGallery();
  });
})();
