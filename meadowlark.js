const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const fortune = require('./lib/fortune')

// configure Handlebars view engine
app.engine('handlebars', engine({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

//static view
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

// GET
app.get('/', (req, res) => res.render('home'))
app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', { fortune: fortune.getFortune() })
})
// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))