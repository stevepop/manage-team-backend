const nodemailer = require('nodemailer')
const sesTransport = require('nodemailer-ses-transport')
const Email = require('email-templates')

const transporter = nodemailer.createTransport(sesTransport({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  rateLimit: 5
}))


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