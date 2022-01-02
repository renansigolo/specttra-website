const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true })
admin.initializeApp()

const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.pwd

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

exports.sendMail = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const form = req.body

    const mailOptions = {
      from: 'Specttra Admin <admin@specttra.com.br>',
      to: 'renan.sigolo@gmail.com',
      subject: 'Contato Website',
      html: `
      Nome: ${form.name}
      Email: ${form.email}
      Mensagem: ${form.message}
      `,
    }

    return transporter.sendMail(mailOptions, (err, info) => {
      return err
        ? res.send(err.toString())
        : res.status(200).send('Menssagem enviada com sucesso').end()
    })
  })
})
