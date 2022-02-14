const cottagesRouter = require('express').Router()
const Cottage = require('../models/cottage')

cottagesRouter.get('/', async (request, response) => {
  const cottages = await Cottage.find({})

  response.json(cottages.map(cottage => cottage.toJSON()))
})

cottagesRouter.get('/:id', async (request, response) => {
  const cottage = await Cottage.findById(request.params.id)

  if (cottage) {
    response.json(cottage.toJSON())
  }
  else {
    response.status(404).end()
  }
})

cottagesRouter.post('/', async (request, response) => {
  const body = request.body

  const cottage = new Cottage({
    name: body.name,
    price: body.price
  })

  const savedCottage = await cottage.save()

  response.json(savedCottage.toJSON())
})

cottagesRouter.delete('/:id', async (request, response) => {
  const cottageId = request.params.id

  const cottage = await Cottage.findById(cottageId)

  if(!cottage) {
    return response.status(400).json({ error: 'Wrong cottage id'})
  }

  await Cottage.findByIdAndRemove(cottageId)
  response.status(204).end()
})

cottagesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const cottage = {
    name: body.name,
    price: body.price
  }

  await Cottage.findByIdAndUpdate(request.params.id, cottage, { new: true })
    .then(updatedCottage => {
      response.json(updatedCottage.toJSON())
    })
    .catch(error => next(error))
})

module.exports = cottagesRouter