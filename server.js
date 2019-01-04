const express = require('express')
const cors = require('cors')
const path = require('path')

const bodyParser = require('body-parser')

// import routes
const player = require('./routes/player')
const match = require('./routes/match')
const matchReport = require('./routes/match-report')
const training = require('./routes/training')
const auth = require('./routes/auth')

const app = express()
app.set('view engine', 'ejs');

// set up mongoose connection
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost:27017/myteam'

let mongoDB = process.env.MONGODB_URI || MONGODB_URI
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// static files
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware
app.use(cors())
app.use(bodyParser.json())

// activate routes
app.use('/auth', auth)
app.use('/players', player)
app.use('/matches', match)
app.use('/match-reports', matchReport)
app.use('/trainings', training)

// Global error handler
app.use((error, req, res, next) => {
 const status = error.statusCode || 500;
 const message = error.message;
 const data = error.data;
 res.status(status).json({ message: message, data: data });
})

let port = 4000

app.listen(port, () => console.log('Server ready and running on port ' + port))