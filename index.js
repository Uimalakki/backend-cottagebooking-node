const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const cottagesRouter = require('./controllers/cottages')
const bookingsRouter = require('./controllers/bookings')
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
app.use('/api/bookings', bookingsRouter)

app.get('/', (request, response) => {
  response.send('<h1>Cottagebooking backend</h1>')
})

app.use(middleware.errorHandler)

app.listen(config.PORT)
logger.info(`Server is running on port ${config.PORT}`)