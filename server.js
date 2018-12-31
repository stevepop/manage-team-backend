const express = require('express')
var cors = require('cors')
const app = express()

app.set('view engine', 'ejs');

const bodyParser = require('body-parser')

// import routes
const player = require('./routes/player')
const match = require('./routes/match')
const matchReport = require('./routes/match-report')
const training = require('./routes/training')
const auth = require('./routes/auth')

// set up mongoose connection
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb+srv://stevepop:stevedba1@cluster0-ledd6.mongodb.net/shenstone';
let mongoDB = process.env.MONGODB_URI || MONGODB_URI
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Middleware
app.use(cors())
app.use(bodyParser.json())

// activate routes
app.use('/auth', auth)
app.use('/players', player)
app.use('/matches', match)
app.use('/match-reports', matchReport)
app.use('/trainings', training)

let port = 4000

app.listen(port, () => console.log('Server ready and running on port ' + port))