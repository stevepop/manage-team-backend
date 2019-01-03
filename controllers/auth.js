require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const emailSender = require('../utils/email-transport')

const User = require('../models/user')

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

      return res.status(200).json({token: token, userId: loadedUser._id})
    
    })
    .catch(err => {
      const error = new Error(err)
      error.httpStatusCode = 500
      return next(error)
    })
}

exports.createUser = async (req, res, next) => {

  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email
  const role = req.body.role
  const password = 'mypass'

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      first_name: first_name,
      last_name: last_name,
      role: role
    })

    const result = await user.save()
    
    const emailOptions = {
      template: 'welcome',
      message: {
        from: 'support@naijaprizes.com',
        to: email,
        subject: 'Welcome To The Team'
      },
      locals: {
        fname: first_name,
        lname: last_name,
        email: email,
        password: password
      }
    }

    await emailSender.send(emailOptions)

    res.status(201).json({ message: 'User created!', userId: result._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getUser = (req, res, next) => {
  return res.status(200).json({data: {user: { email: 'steve@me.com'}}})
}