const mongoose = require('mongoose')

// import environmental variables
require('dotenv').config({
	path: 'variables.env'
})

// connect to our database and handle any bad connections
let mongooseOptions = {}

if (process.env.DATABASE_USERNAME &&
	process.env.DATABASE_PASSWORD &&
	process.env.DATABASE_USERNAME.trim() !== '' &&
	process.env.DATABASE_PASSWORD.trim() !== '') {
	mongooseOptions = {
		auth: {
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD
		}
	}
}

mongoose.Promise = global.Promise
mongoose.connect(
		`mongodb://${process.env.DATABASE_HOST || localhost}:${process.env.DATABASE_PORT || 27017}/${process.env.DATABASE_NAME || 'express-mongo-boilerplate'}`,
		mongooseOptions
	)
	.catch((error) => {
		console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${error.message}`)
		process.exit(1)
	})

// load all models
// require('./models/ContactForm')

// load the app
const app = require('./app')

// define SSL/TLS options
let tlsEnabled = false
let tlsOptions = {}

if (process.env.SSL === 'on' &&
	process.env.SSL_CERT != undefined &&
	process.env.SSL_KEY != undefined &&
	process.env.SSL_CERT != '' &&
	process.env.SSL_KEY != '') {
	tlsEnabled = true

	try {
		tlsOptions = {
			key: fs.readFileSync(process.env.SSL_KEY),
			cert: fs.readFileSync(process.env.SSL_CERT)
		}

		if (process.env.SSL_CHAIN != undefined &&
			process.env.SSL_CHAIN != '') {
			tlsOptions.ca = fs.readFileSync(process.env.SSL_CHAIN)
		}

		if (process.env.SSL_DHPARAM != undefined &&
			process.env.SSL_DHPARAM != '') {
			tlsOptions.dhparam = fs.readFileSync(process.env.SSL_DHPARAM)
		}
	} catch (e) {
		console.error(`\n!!! ${e.message}\n`)
		console.error('=> SSL could not be enabled. Using fallback.\n')
		tlsEnabled = false
	}
}

// start the app
app.set('port', process.env.PORT || 7777)

if (tlsEnabled === true) {
	const server = https.createServer(tlsOptions, app).listen(app.get('port'), () => {
		console.log(`Express running with TLS → PORT ${server.address().port}`)
	})
} else {
	const server = app.listen(app.get('port'), () => {
		console.log(`Express running → PORT ${server.address().port}`)
	})
}

// TEMP SEND EMAIL
// require('./handlers/mail')