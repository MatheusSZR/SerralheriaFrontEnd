(() => {
  'use strict';

  const SELECTORS = {
    modal: '#cadastroModal',
    openButton: '#openModalBtn',
    closeButton: '.close',
    zoomable: '.zoom'
  };

  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const toggleModal = (modal, triggerButton, isOpen) => {
    modal.classList.toggle('show', isOpen);
    modal.setAttribute('aria-hidden', String(!isOpen));

    if (triggerButton) {
      triggerButton.setAttribute('aria-expanded', String(isOpen));
    }

    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const trapFocusInModal = (modal, event) => {
    if (event.key !== 'Tab') return;

    const focusables = Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );

    if (!focusables.length) {
      event.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const initModal = () => {
    const modal = document.querySelector(SELECTORS.modal);
    const openModalBtn = document.querySelector(SELECTORS.openButton);
    const closeModalBtn = document.querySelector(SELECTORS.closeButton);

    if (!modal || !openModalBtn || !closeModalBtn) return;

    let lastFocusedElement = null;

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      toggleModal(modal, openModalBtn, true);

      const autofocusTarget = modal.querySelector('[autofocus]') || modal.querySelector(FOCUSABLE_SELECTOR);
      autofocusTarget?.focus();
    };

    const closeModal = () => {
      toggleModal(modal, openModalBtn, false);
      lastFocusedElement?.focus?.();
    };

    openModalBtn.setAttribute('aria-controls', modal.id);
    openModalBtn.setAttribute('aria-expanded', 'false');
    modal.setAttribute('aria-hidden', 'true');

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      const isOpen = modal.classList.contains('show');
      if (!isOpen) return;

      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      trapFocusInModal(modal, event);
    });
  };

  const initGalleryZoom = () => {
    const images = document.querySelectorAll(SELECTORS.zoomable);
    if (!images.length) return;

    images.forEach((image) => {
      image.addEventListener('click', () => {
        if (image.classList.contains('is-zoomed')) return;

        image.classList.add('is-zoomed');
        window.setTimeout(() => image.classList.remove('is-zoomed'), 500);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initModal();
    initGalleryZoom();
  });
})();
