const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: String,
  gallery: [String],
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  specialties: [String],
  services: [{
    name: String,
    description: String,
    price: Number
  }],
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  phone: String,
  email: String,
  website: String,
  verified: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Set updatedAt on save
serviceProviderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema); 