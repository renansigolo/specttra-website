import { sendForm } from './modules/sendForm';

(() => {
  document
    .querySelector('form')
    .addEventListener('submit', (event) => sendForm(event));
})();
