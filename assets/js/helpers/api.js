import { apiStatusCodes } from './api-status-codes'

/**
 * @typedef GenericApiData
 * @property {object} formData - The data to send
 */

/**
 * @typedef FormData
 * @property {string} name - The form field name
 * @property {string} email - The form field email
 * @property {string} message - The form field message
 */

/**
 * Abstract a POST method implementation:
 * @param {string} url A string containing the URL to which the request is sent.
 * @param {FormData|GenericApiData} data An object containing data to be sent to the server.
 * @returns {Promise<string>} A Promise that is resolved with the message from the response.
 */
const post = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  // Handle the response
  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json')
  const responseData = isJson ? await response.json() : ''
  const { message } = responseData

  // Handle the error response
  if (!response.ok) {
    const errorMsg = message
      ? `Error: ${message} (${response.status})`
      : `Error: ${apiStatusCodes[response.status]} (${response.status})`
    return Promise.reject(errorMsg)
  }

  return message
}

// Export the API module
export const api = { post }
