import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaClock, FaMapMarkerAlt, FaPhone, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function RestaurantPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);

  // Mock restaurant data
  const restaurant = {
    id: parseInt(id),
    name: 'Pizza Paradise',
    rating: 4.8,
    reviews: 2540,
    deliveryTime: 35,
    deliveryFee: 2.99,
    minimumOrder: 15,
    address: '123 Main St, Downtown',
    phone: '+1-800-PIZZA-NOW',
    image: 'https://via.placeholder.com/1200x400?text=Pizza+Paradise',
    open: true,
    categories: ['Pizza', 'Sides', 'Desserts', 'Beverages'],
    menu: [
      {
        id: 1,
        name: 'Margherita Pizza',
        category: 'Pizza',
        price: 12.99,
        rating: 4.9,
        image: 'https://via.placeholder.com/300x300?text=Margherita',
        description: 'Classic pizza with tomato, mozzarella, and basil',
        bestseller: true,
        prepTime: 15
      },
      {
        id: 2,
        name: 'Pepperoni Pizza',
        category: 'Pizza',
        price: 14.99,
        rating: 4.7,
        image: 'https://via.placeholder.com/300x300?text=Pepperoni',
        description: 'Loaded with pepperoni and cheese',
        bestseller: true,
        prepTime: 15
      },
      {
        id: 3,
        name: 'Garlic Bread',
        category: 'Sides',
        price: 4.99,
        rating: 4.6,
        image: 'https://via.placeholder.com/300x300?text=Garlic+Bread',
        description: 'Crispy garlic bread with herbs',
        prepTime: 5
      },
      {
        id: 4,
        name: 'Chocolate Cake',
        category: 'Desserts',
        price: 5.99,
        rating: 4.8,
        image: 'https://via.placeholder.com/300x300?text=Chocolate+Cake',
        description: 'Rich chocolate cake',
        prepTime: 0
      },
      {
        id: 5,
        name: 'Coca Cola',
        category: 'Beverages',
        price: 2.49,
        rating: 5.0,
        image: 'https://via.placeholder.com/300x300?text=Coca+Cola',
        description: 'Cold fizzy drink',
        prepTime: 0
      }
    ]
  };

  const menuItems = selectedCategory === 'all'
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    dispatch(addToCart({ ...item, quantity }));
    toast.success(`${item.name} added to cart! 🛒`);
    setQuantities({ ...quantities, [item.id]: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800 pb-20">
      {/* Restaurant Header */}
      <div className="relative h-96 bg-gray-300 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-8">
          <h1 className="text-5xl font-bold mb-4">{restaurant.name}</h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              {restaurant.rating} ({restaurant.reviews} reviews)
            </div>
            <div className="flex items-center gap-2">
              <FaClock /> {restaurant.deliveryTime} min
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> {restaurant.address}
            </div>
            <div className="flex items-center gap-2">
              <FaPhone /> {restaurant.phone}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8 bg-white dark:bg-slate-700 rounded-xl p-4 shadow">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-600 text-gray-800 dark:text-white'
              }`}
            >
              All
            </button>
            {restaurant.categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-600 text-gray-800 dark:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                {item.bestseller && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                    ⭐ Best Seller
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-2xl">
                    <FaHeart />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {item.rating}
                  </span>
                </div>

                {/* Price and Add */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-600">
                  <span className="text-2xl font-bold text-orange-600">
                    ${item.price}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantities[item.id] || 1}
                      onChange={(e) => setQuantities({ ...quantities, [item.id]: parseInt(e.target.value) })}
                      className="w-12 px-2 py-1 border border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded text-center"
                    />
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-bold transition flex items-center gap-1"
                    >
                      <FaShoppingCart /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;