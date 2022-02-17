const bookingsRouter = require('express').Router()
const Booking = require('../models/booking')

bookingsRouter.get('/', async (request, response) => {
  const bookings = await Booking
    .find({})
    .populate('cottage', { name: 1, price: 1 })

  response.json(bookings.map(booking => booking.toJSON()))
})

bookingsRouter.post('/', async (request, response) => {
  const body = request.body

  const booking = new Booking({
    name: body.name,
    price: body.price,
    date: body.date,
    cottage: body.cottage
  })

  const savedBooking = await booking.save()
  response.json(savedBooking.toJSON()).end()

})

bookingsRouter.delete('/:id', async (request, response) => {
  const bookingId = request.params.id

  await Booking.findByIdAndRemove(bookingId)
  response.status(204).end()

})

module.exports = bookingsRouter