const mongoose = require('mongoose');

const foodOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem'
    },
    quantity: Number,
    price: Number,
    customizations: [
      {
        name: String,
        value: String,
        price: Number
      }
    ],
    specialInstructions: String
  }],
  subtotal: Number,
  deliveryFee: Number,
  tax: Number,
  discount: {
    amount: Number,
    code: String
  },
  totalAmount: Number,
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'cash', 'digital_wallet'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'preparing',
      'ready_for_pickup',
      'on_the_way',
      'delivered',
      'cancelled'
    ],
    default: 'pending'
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    latitude: Number,
    longitude: Number,
    instructions: String
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  driverLocation: {
    latitude: Number,
    longitude: Number,
    updatedAt: Date
  },
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  specialRequests: String,
  promoCode: String,
  rating: {
    foodRating: Number,
    deliveryRating: Number,
    restaurantRating: Number,
    driverRating: Number,
    review: String
  },
  scheduledFor: Date, // For scheduled orders
  contactless: Boolean,
  tip: Number,
  timeline: [
    {
      status: String,
      timestamp: Date,
      message: String
    }
  ]
}, { timestamps: true });

foodOrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `FOOD-${timestamp}${random}`;
  }
  next();
});

module.exports = mongoose.model('FoodOrder', foodOrderSchema);