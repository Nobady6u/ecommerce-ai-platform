const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: String,
  cuisine: [String], // Pizza, Burgers, etc
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: { type: Number, default: 0 },
  phone: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    latitude: Number,
    longitude: Number
  },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  deliveryTime: {
    min: { type: Number, default: 30 }, // minutes
    max: { type: Number, default: 45 }
  },
  deliveryFee: {
    type: Number,
    default: 2.99
  },
  minimumOrder: {
    type: Number,
    default: 10
  },
  image: String,
  logo: String,
  banner: String,
  featured: Boolean,
  promotions: [{
    title: String,
    discount: Number, // percentage
    code: String,
    expiresAt: Date
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  averageOrderValue: {
    type: Number,
    default: 0
  },
  tags: [String],
  badges: [String], // 'fast-delivery', 'highly-rated', etc
  acceptedPayments: [
    {
      type: String,
      enum: ['credit_card', 'debit_card', 'cash', 'digital_wallet']
    }
  ]
}, { timestamps: true });

// Index for faster queries
restaurantSchema.index({ 'address.latitude': 1, 'address.longitude': 1 });
restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);