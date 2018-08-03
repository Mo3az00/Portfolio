const path = require('path')
const fs = require('fs')
const https = require('https')
const helmet = require('helmet')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const routes = require('./routes/web')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')

// create the app
const app = express()

// advance security with Helmet
app.use(helmet())

// set the template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// sessions allow us to store data on visitors from request to request
// this can keep users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SESSION_SECRET || 'notaverysecuresecret',
  key: process.env.SESSION_KEY || 'notaverysecurekey',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// the flash middleware let's us use req.flash('error', 'Message'), which will then pass that message to the next page the user requests
app.use(flash());

// load helpers
app.use((request, response, next) => {
  response.locals.helpers = helpers
  response.locals.currentPath = request.path
  response.locals.flashes = request.flash()
  next()
})

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')))
app.use('/.well-known', express.static(path.join(__dirname, '.well-known'), {}))

// takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set route handling
app.use('/', routes)

// if above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound)

// one of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors)

// otherwise this was a really bad error we didn't expect!
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)  
}

// production error handler
app.use(errorHandlers.productionErrors)

// export the app, that gets started by start.js
module.exports = app