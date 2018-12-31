require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sesTransport = require('nodemailer-ses-transport')
const Email = require('email-templates')

const User = require('../models/user')

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

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({email: email})
    .then(loadedUser => {
      if (!loadedUser) {
        return res.status(422).json({message: "User does not exist"})
      }
     
      const doMatch = bcrypt.compareSync(password, loadedUser.password)
      
      if (!doMatch) {
        return res.status(200).json({message: "Enable to log you in with those details"})
      }

      const token = jwt.sign(
        {
          email: loadedUser.email, 
          userId: loadedUser._id.toString()
        }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      // transporter.sendMail({
      //   from: "support@naijaprizes.com",
      //   to: "stevepop@gmail.com", 
      //   subject: "Login was successful", 
      //   text: "You have succssfully logged in to the ShenstoneFC website",
      //   html:'You have succssfully logged in to the <b>ShenstoneFC website</b>'
      // }).catch(err => {
      //   console.log(err)
      // })
      emailSender.send({
        template: 'welcome',
        message: {
          from: 'Shenstone FC <support@naijaprizes.com>',
          to: 'stevepop@gmail.com',
          subject: 'You have logged in'
        },
        locals: {
          fname: 'Steve',
          lname: 'Pope'
        }
      }).then(() => console.log('email has been sent!'))

      return res.status(200).json({token: token, userId: loadedUser._id})
    
    })
    .catch(err => {
      const error = new Error(err)
      error.httpStatusCode = 500
      return next(error)
    })
}

exports.getUser = (req, res, next) => {
  return res.status(200).json({data: {user: { email: 'steve@me.com'}}})
}