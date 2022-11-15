const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  cans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Can'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

User = mongoose.model('User', userSchema)
module.exports = User
