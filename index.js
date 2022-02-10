const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())

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
  console.log(cottage)
  response.json(cottage)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)