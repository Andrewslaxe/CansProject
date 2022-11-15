const mongoose = require("mongoose")

const cansSchema = new mongoose.Schema({
  canID: {
    type: Number,
    required: true,
    unique: true,
  },
  storage: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  battery: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

cansSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Can = mongoose.model('Can', cansSchema);
module.exports = Can