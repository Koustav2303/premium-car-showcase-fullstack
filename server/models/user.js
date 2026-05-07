const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user', // Can be 'admin' or 'user' [cite: 75, 89]
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  savedConfigurations: [{
    type: Object // Will store the customized 3D parameters [cite: 79-82, 128]
  }],
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking' // Links to the Booking Schema [cite: 129, 143]
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);