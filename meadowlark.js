const express = require('express')
const engine  = require('express-handlebars')
const app = express()
const handlers = require('./lib/handlers')


// configure Handlebars view engine
app.engine('handlebars', engine({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  }
}))
app.set('view engine', 'handlebars')

//static view
// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/public'))

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000

// GET
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/section-test', handlers.sectionTest)

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)


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