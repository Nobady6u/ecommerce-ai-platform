const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: String, // Appetizers, Main Course, etc
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: Number,
  image: String,
  images: [{
    url: String,
    caption: String
  }],
  isVegetarian: Boolean,
  isVegan: Boolean,
  isSpicy: Boolean,
  calories: Number,
  prepTime: Number, // minutes
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: { type: Number, default: 0 },
  popularity: { type: Number, default: 0 },
  ingredients: [String],
  allergens: [String],
  customizations: [{
    name: String, // e.g., 'Size', 'Toppings'
    options: [{
      name: String,
      price: Number
    }],
    required: Boolean
  }],
  available: {
    type: Boolean,
    default: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: Boolean,
  bestseller: Boolean,
  tags: [String],
  nutritionFacts: {
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  orders: { type: Number, default: 0 }
}, { timestamps: true });

menuItemSchema.index({ restaurant: 1, category: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });
menuItemSchema.index({ popularity: -1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);