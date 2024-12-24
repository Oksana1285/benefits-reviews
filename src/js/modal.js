const body = document.querySelector('body');
const windowModal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal-window-btn');
const OPEN_MODAL = 'is-open';

export const openModal = data => {
  windowModal.classList.add(OPEN_MODAL);
  body.style.overflow = 'hidden';
  renderModal(data);
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

function renderModal({ title = '', message = '' }) {
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-window-title');
  modalTitle.textContent = title;

  const modalMessage = document.createElement('p');
  modalMessage.classList.add('modal-window-text');
  modalMessage.textContent = message;
  clearModal();

  const modalWindow = document.querySelector('.modal-window');
  modalWindow.appendChild(modalTitle);
  modalWindow.appendChild(modalMessage);
}

function clearModal() {
  const modalTitle = document.querySelector('.modal-window-title');
  const modalMessage = document.querySelector('.modal-window-text');
  if (modalTitle) {
    modalTitle.remove();
  }
  if (modalMessage) {
    modalMessage.remove();
  }
}
