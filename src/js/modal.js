const body = document.querySelector('body');
const windowModal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal-window-btn');
const OPEN_MODAL = 'is-open';

export const openModal = data => {
  windowModal.classList.add(OPEN_MODAL);
  body.style.overflow = 'hidden';
};

closeBtn.addEventListener('click', () => {
  closeWindow();
});

windowModal.addEventListener('click', event => {
  if (event.target === windowModal) {
    closeWindow();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeWindow();
  }
});

function closeWindow() {
  windowModal.classList.remove(OPEN_MODAL);
  document.body.style.overflow = 'auto';
  clearModal();
}

function clearModal() {
  const modalTitle = document.querySelector('.modal-title');
  const modalMessage = document.querySelector('.modal-massage');
  if (modalTitle) {
    modalTitle.remove();
  }
  if (modalMessage) {
    modalMessage.remove();
  }
}
