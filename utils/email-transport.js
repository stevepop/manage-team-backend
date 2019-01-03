require('dotenv').config()
const nodemailer = require('nodemailer')
const Email = require('email-templates')

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD
  }
});


const emailSender = new Email({
  transport: transporter,
  send: true,
  preview: false,
  views: {
    options: {
      extension: 'ejs',
    }
  }
})

module.exports = emailSender