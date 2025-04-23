const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName : {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  userName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    immutable: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})
const User = mongoose.model('User', userSchema)

module.exports = User