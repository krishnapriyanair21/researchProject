const express = require('express')
const engine  = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers')


// configure Handlebars view engine
app.engine('handlebars', engine({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//static view
// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/public'))

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000

// GET
app.get('/', handlers.home)

app.get('/about', handlers.about)

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

// newsletter 
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)

// global module
if(require.main === module) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}