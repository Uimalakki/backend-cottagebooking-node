const mongoose = require('mongoose')

const cottageSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    price: {
      type: Number,
      required: true,
      minlength: 2
    }
})

cottageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Cottage', cottageSchema)