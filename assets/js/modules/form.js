import { sendMailUrl } from '@params'
import { api } from '../helpers/api'

const alertBoxContent = {
  success: {
    title: 'Formulário enviado com sucesso!',
    text: 'Em breve entraremos em contato.',
    status: 'success',
  },
  error: {
    title: 'Erro ao enviar o formulário!',
    text: 'Por favor, tente novamente mais tarde.',
    status: 'error',
  },
}

/**
 * Display the alert box with the respective content
 * @param {string} title - The alert box title
 * @param {string} text - The alert box text
 * @param {string} status - The API Response status
 */
const showTemplate = ({ title, text, status }) => {
  const alertBoxClass = `-${status}`
  const formInputs = document.querySelector('[data-js-form-inputs]')
  const formResponse = document.querySelector('[data-js-form-response]')
  const alertBoxTemplate = document.querySelector('[data-js-alert-box]')

  // Hide current form
  formInputs.classList.add('hidden')
  formResponse.classList.remove('hidden')

  // Set the alert box content
  const alertBox = alertBoxTemplate.content.firstElementChild.cloneNode(true)
  alertBox.classList.add(alertBoxClass)
  alertBox.querySelector('[data-js-alert-title]').textContent = title
  alertBox.querySelector('[data-js-alert-text]').textContent = text

  formResponse.appendChild(alertBox)
}

/**
 * Send form data to the cloud function
 * @param {SubmitEvent} event
 */
const sendForm = async (event) => {
  // Prevent the default behavior
  event.preventDefault()

  // Set Loading state
  const submitBtn = document.querySelector('[data-js-submit-btn]')
  submitBtn.textContent = 'Enviando...'
  submitBtn.setAttribute('disabled', true)

  // Select the form values
  const form = event.currentTarget
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  // Send the data to the cloud function
  try {
    await api.post(sendMailUrl, data)
    showTemplate(alertBoxContent.success)
  } catch (err) {
    showTemplate(alertBoxContent.error)
  } finally {
    form.reset()
  }
}

/** Init Form */
document
  .querySelector('form')
  .addEventListener('submit', (event) => sendForm(event))
