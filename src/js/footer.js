import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.submit-form-js');
const [inputEmail, inputComments] = form;

const emailSuccess = document.querySelector('.email-text-success');
const emailError = document.querySelector('.email-text-error');
const commentError = document.querySelector('.comments-text-error');

const sendUser = async ({ email, comment }) => {
  const URL =
    'https://portfolio-js.b.goit.study/api-docs/#/Requests/post_requests';

  const { data } = await axios.post(URL, { email, comment });
  return data;
};

const FON_SUCCESS = {
  valid: 'valid-input',
  invalid: 'invalid-input',
  isVisible: 'is-visible',
};

const emailValidate = email => {
  const pattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const isValidEmail = pattern.test(email);

  if (!isValidEmail) {
    inputEmail.classList.add(FON_SUCCESS.invalid);
    emailError.classList.add(FON_SUCCESS.isVisible);
  } else {
    inputEmail.classList.add(FON_SUCCESS.valid);
    emailSuccess.classList.add(FON_SUCCESS.isVisible);
  }
  return isValidEmail;
};

export const textValidate = text => {
  if (!text) {
    inputComments.classList.add(FON_SUCCESS.invalid);
    commentError.classList.add(FON_SUCCESS.isVisible);
  } else {
    inputComments.classList.add(FON_SUCCESS.valid);
  }
  return !!text;
};

const fieldValidate = field => {
  const fieldName = field.name;

  if (fieldName === 'userEmail') {
    emailSuccess.classList.remove(FON_SUCCESS.isVisible);
    commentError.classList.remove(FON_SUCCESS.isVisible);
  }

  if (fieldName === 'userComments') {
    commentError.classList.remove(FON_SUCCESS.isVisible);
  }

  field.classList.remove(FON_SUCCESS.valid);
  field.classList.remove(FON_SUCCESS.invalid);
};

const allValidate = () => {
  const tagValidate = [emailSuccess, emailError, commentError];

  tagValidate.forEach(tagElement => {
    tagElement.classList.remove(FON_SUCCESS.isVisible);
  });

  const validateInputs = [inputEmail, inputComments];

  validateInputs.forEach(input => {
    input.classList.remove(FON_SUCCESS.valid);
    input.classList.remove(FON_SUCCESS.invalid);
  });
};

const KEY = 'formData';

const formData = getFromLocalStorage() || {
  userEmail: '',
  userComments: '',
};

inputEmail.value = formData.userEmail;
inputComments.value = formData.userComments;

form.addEventListener('input', event => {
  fieldValidate(event.target);

  const { name, value } = event.target;
  formData[name] = value.trim();
  setLocalStorage(formData);
});

form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  const { userEmail, userComments } = formData;

  const isValidEmail = emailSuccess(userEmail);
  const isValidText = textValidate(userComments);

  if (!isValidEmail || !isValidText) {
    return;
  }

  try {
    const data = await sendUser({
      email: userEmail,
      comment: userComments,
    });
    openModal(data);

    resetData();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
}

// // helpers
// function setLocalStorage(value, key = KEY) {
//   localStorage.setItem(key, JSON.stringify(value));
// }
// function getFromLocalStorage(key = KEY) {
//   return JSON.parse(localStorage.getItem(key));
// }

// function resetData(key = KEY) {
//   localStorage.removeItem(key);
//   form.reset();
//   allValidate();
//   formData.userEmail = '';
//   formData.userComments = '';
// }

// (() => {
//   const refs = {
//     // Додати атрибут data-modal-open на кнопку відкриття
//     openModalBtn: document.querySelector('[data-modal-open]'),
//     // Додати атрибут data-modal-close на кнопку закриття
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     // Додати атрибут data-modal на бекдроп модалки
//     modal: document.querySelector('[data-modal]'),
//   };

//   refs.openModalBtn.addEventListener('click', toggleModal);
//   refs.closeModalBtn.addEventListener('click', toggleModal);

//   function toggleModal() {
//     // is-open це клас який буде додаватися/забиратися на бекдроп при натисканні на кнопки
//     refs.modal.classList.toggle('is-open');
//   }
// })();


