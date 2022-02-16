const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true })
admin.initializeApp()

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
exports.sendMail = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const form = req.body

    const mailOptions = {
      from: 'Specttra Admin <admin@specttra.com.br>',
      to: 'comercial@specttra.com.br',
      subject: `Contato Specttra Website | Enviado por ${form.name}`,
      html: `
      <h3>Nova mensagem enviada através do site da Specttra</h3>
      <p><b>Nome: </b>${form.name}</p>
      <p><b>Email: </b>${form.email}</p>
      <p><b>Telefone: </b>${form.phone ? form.phone : 'N/A'}</p>
      <p><b>Mensagem: </b>${form.message}</p>`,
    }

    return transporter.sendMail(mailOptions, (err) => {
      return err
        ? res.status(500).send(err.toString()).end()
        : res.status(200).end()
    })
  })
})
