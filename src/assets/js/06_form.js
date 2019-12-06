let name = document.querySelector('[name="name"]').value
let email = document.querySelector('[name="email"]').value
let message = document.querySelector('[name="message"]').value

const sendForm = () => {
  event.preventDefault()
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = () => {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('form-submitted').innerHTML = this.responseText
    }
  }
  console.log('TCL: sendForm -> name', name)

    xhttp.open(
      'POST',
      'https://us-central1-specttra-prod.cloudfunctions.net/sendMail',
      true
    )
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhttp.send(`name=${name}&email=${email}&message=${message}`)
}
