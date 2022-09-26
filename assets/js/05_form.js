const sendForm = () => {
  event.preventDefault();

  const name = document.querySelector('[name="name"]').value;
  const email = document.querySelector('[name="email"]').value;
  const message = document.querySelector('[name="message"]').value;

  // Send a POST request
  axios({
    method: 'post',
    url: 'https://us-central1-specttra-prod.cloudfunctions.net/sendMail',
    data: {
      name,
      email,
      message,
    },
  }).then((res) => {
    console.log('🚀 ~ sendForm ~ res', res);
    document.querySelector('#form').style.display = 'none';
    document.querySelector('#form-response').style.display = 'block';
  });
};
