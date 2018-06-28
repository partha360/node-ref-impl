const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./api/config/keys')
const morgan = require('morgan')
const logger = require('./api/config/logger')
const errorHandler = require('./api/middlewares/errorHandler')
const error404 = require('./api/middlewares/404')
const methodOverride = require('method-override')

require('./api/models/User')
require('./api/models/Blog')
require('./api/services/passport')
require('./api/services/cache')

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI, { useMongoClient: true })

const app = express()

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session()) // use session cookies for users
app.use(methodOverride())

app.use(morgan('combined', { stream: logger.stream })) // logging

require('./api/routes/authRoutes')(app)
require('./api/routes/blogRoutes')(app)

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'))
  })
}

app.use(error404)
app.use(errorHandler)

process.on('uncaughtException', ex => {
  logger.error(ex)
  process.exit(1) // terminate node process
})

process.on('unhandledRejection', ex => {
  logger.error(ex)
  process.exit(1) // terminate node process
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT)
})
