const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const cottagesRouter = require('./controllers/cottages')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
  
app.use(cors())
app.use(express.json())

app.use('/api/cottages', cottagesRouter)

let cottages = [
  {
    id: 1,
    name: 'Metso',
    price: 150
  },
  {
    id: 2,
    name: 'Kuukkeli',
    price: 125
  },
  {
    id: 3,
    name: 'Kaakkuri',
    price: 99
  },
  {
    id: 4,
    name: 'Sikotauti',
    price: 50
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Cottagebooking backend</h1>')
})
/*
app.get('/api/cottages', (request, response) => {
  response.json(cottages)
})

app.get('/api/cottages/:id', (request, response) => {
  const id = Number(request.params.id)
  const cottage = cottages.find(cottage => cottage.id === id)

  if(cottage) {
    response.json(cottage)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/cottages/:id', (request, response) => {
  const id = Number(request.params.id)
  cottages = cottages.filter(cottage => cottage.id !== id)

  response.status(204).end()
})

app.post('/api/cottages', (request, response) => {
  const cottage = request.body
  response.json(cottage)
})
*/
app.use(middleware.errorHandler)

app.listen(config.PORT)
logger.info(`Server is running on port ${config.PORT}`)