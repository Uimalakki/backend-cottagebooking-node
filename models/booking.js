const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5
    },
    price: {
      type: Number,
      required: true,
      minlength: 2
    },
    cottage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cottage'
    },
    date: {
        type: String,
        required: true,
    }
})

bookingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Booking', bookingSchema)