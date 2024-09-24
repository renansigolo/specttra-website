const functions = require('firebase-functions')
const { initializeApp } = require('firebase-admin/app')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true })

initializeApp()

// Retrieve Cloud Environment Variables
const { email, password } = functions.config().gmail

// Create Nodemailer Transporter Config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
})

// Send an email with the details from the Contact Form on the website
exports.sendMail = functions.https.onRequest((req, res) =>
  cors(req, res, () => {
    const form = req.body

    const mailOptions = {
      from: 'Specttra Admin <admin@specttra.com.br>',
      replyTo: form.email,
      to:
        form.name === 'test'
          ? 'renan.sigolo@gmail.com'
          : 'comercial@specttra.com.br',
      subject: `Contato Specttra Website | Enviado por ${form.name}`,
      html: `
      <h3>Nova mensagem enviada através do site da Specttra</h3>
      <p><b>Nome: </b>${form.name}</p>
      <p><b>Email: </b>${form.email}</p>
      <p><b>Mensagem: </b>${form.message}</p>`,
    }

    return transporter.sendMail(mailOptions, (err) =>
      err
        ? res.status(500).send(err)
        : res.status(200).send({ message: 'success' }),
    )
  }),
)
