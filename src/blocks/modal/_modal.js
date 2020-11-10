function handleKeyDown(event) {
  const ESCAPE_KEY_CODE = 27;
  if (
    (event.keyCode && event.keyCode === ESCAPE_KEY_CODE) ||
    (event.key && event.key === 'Escape')
  ) {
    event.preventDefault();
    this.hide();
  }
}

function getVerticalScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

class Modal {
  constructor({ element, triggerClass }) {
    this.element = element;
    this.triggerClass = triggerClass;
    Object.defineProperty(this, 'handleKeyDown', {
      value: handleKeyDown.bind(this),
    });
  }

  show() {
    this.element.removeAttribute('aria-hidden');
    this.element.classList.add(this.triggerClass);
    document.body.style.paddingRight = `${getVerticalScrollbarWidth()}px`;
    document.body.style.overflow = 'hidden';
    document.documentElement.addEventListener('keydown', this.handleKeyDown);
  }

  hide() {
    this.element.setAttribute('aria-hidden', 'true');
    this.element.classList.remove(this.triggerClass);
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
    document.documentElement.removeEventListener('keydown', this.handleKeyDown);
  }
}

const modal = new Modal({
  element: document.querySelector('.js-modal'),
  triggerClass: 'modal_visible',
});

document
  .querySelector('.js-modal-close')
  .addEventListener('click', modal.hide.bind(modal));

function handleMouseLeave(event) {
  if (event.clientY <= 5) {
    modal.show();
    document.documentElement.removeEventListener(
      'mouseleave',
      handleMouseLeave,
    );
  }
}

document.documentElement.addEventListener('mouseleave', handleMouseLeave);
