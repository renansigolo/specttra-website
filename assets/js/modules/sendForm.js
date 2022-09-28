import axios from 'axios';

/**
 * Send form data to the cloud function
 * @param {SubmitEvent} event
 */
export async function sendForm(event) {
  // Prevent the default behavior
  event.preventDefault();

  // Select the form values
  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Show Loading
  document.querySelector('#form').style.display = 'none';
  document.querySelector('#form-response').style.display = 'block';

  // Send the form
  const axiosMessage = await axios
    .post('https://us-central1-specttra-prod.cloudfunctions.net/sendMail', data)
    .then(() => 'Sua mensagem foi enviada com sucesso!')
    .catch(() => 'Ocorreu um erro ao enviar a mensagem :(');

  // Show the response
  document.querySelector('#form-response h2').innerHTML = axiosMessage;
}
