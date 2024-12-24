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

const VALID_INPUT = {
  valid: 'valid-input',
  invalid: 'invalid-input',
  isVisible: 'is-visible',
};

const emailValidate = email => {
  const pattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const isValidEmail = pattern.test(email);

  if (!isValidEmail) {
    inputEmail.classList.add(VALID_INPUT.invalid);
    emailError.classList.add(VALID_INPUT.isVisible);
  } else {
    inputEmail.classList.add(VALID_INPUT.valid);
    emailSuccess.classList.add(VALID_INPUT.isVisible);
  }
  return isValidEmail;
};

const textValidate = text => {
  if (!text) {
    inputComments.classList.add(VALID_INPUT.invalid);
    commentError.classList.add(VALID_INPUT.isVisible);
  } else {
    inputComments.classList.add(VALID_INPUT.valid);
  }
  return !!text;
};

const fieldValidate = field => {
  const fieldName = field.name;

  if (fieldName === 'userEmail') {
    emailSuccess.classList.remove(VALID_INPUT.isVisible);
    commentError.classList.remove(VALID_INPUT.isVisible);
  }

  if (fieldName === 'userComments') {
    commentError.classList.remove(VALID_INPUT.isVisible);
  }

  field.classList.remove(VALID_INPUT.valid);
  field.classList.remove(VALID_INPUT.invalid);
};

const allValidate = () => {
  const tagValidate = [emailSuccess, emailError, commentError];

  tagValidate.forEach(tagElement => {
    tagElement.classList.remove(VALID_INPUT.isVisible);
  });

  const validateInputs = [inputEmail, inputComments];

  validateInputs.forEach(input => {
    input.classList.remove(VALID_INPUT.valid);
    input.classList.remove(VALID_INPUT.invalid);
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

  const isValidEmail = emailValidate(userEmail);
  const isValidText = textValidate(userComments);

  if (!isValidEmail || !isValidText) {
    return;
  }

  try {
    const data = sendUser({
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

function setLocalStorage(value, key = KEY) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromLocalStorage(key = KEY) {
  return JSON.parse(localStorage.getItem(key));
}

function resetData(key = KEY) {
  localStorage.removeItem(key);
  form.reset();
  allValidate();
  formData.userEmail = '';
  formData.userComments = '';
}
