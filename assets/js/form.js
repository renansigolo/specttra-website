const sendForm = () => {
  window.event.preventDefault();

  // Select the form values
  const name = document.querySelector('[name="name"]').value;
  const email = document.querySelector('[name="email"]').value;
  const message = document.querySelector('[name="message"]').value;

  // Show Loading
  document.querySelector('#form').style.display = 'none';
  document.querySelector('#form-response').style.display = 'block';

  // Send a POST request
  axios({
    method: 'post',
    url: 'https://us-central1-specttra-prod.cloudfunctions.net/sendMail',
    data: {
      name,
      email,
      message,
    },
  })
    .then(() => {
      document.querySelector('#form-response h2').innerHTML =
        'Sua mensagem foi enviada com sucesso!';
    })
    .catch(() => {
      document.querySelector('#form-response h2').innerHTML =
        'Ocorreu um erro ao enviar a mensagem :(';
    });
};
