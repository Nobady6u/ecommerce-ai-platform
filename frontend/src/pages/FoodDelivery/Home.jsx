import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaClock, FaFire, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

function FoodDeliveryHome() {
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', name: '🍽️ All', emoji: '🍽️' },
    { id: 'pizza', name: '🍕 Pizza', emoji: '🍕' },
    { id: 'burgers', name: '🍔 Burgers', emoji: '🍔' },
    { id: 'sushi', name: '🍣 Sushi', emoji: '🍣' },
    { id: 'chinese', name: '🥡 Chinese', emoji: '🥡' },
    { id: 'thai', name: '🍜 Thai', emoji: '🍜' },
    { id: 'italian', name: '🍝 Italian', emoji: '🍝' },
    { id: 'mexican', name: '🌮 Mexican', emoji: '🌮' },
    { id: 'desserts', name: '🍰 Desserts', emoji: '🍰' },
    { id: 'drinks', name: '🥤 Drinks', emoji: '🥤' }
  ];

  // Mock restaurant data
  const mockRestaurants = [
    {
      id: 1,
      name: 'Pizza Paradise',
      cuisine: ['Pizza', 'Italian'],
      rating: 4.8,
      reviews: 2540,
      deliveryTime: 35,
      deliveryFee: 2.99,
      image: 'https://via.placeholder.com/400x300?text=Pizza+Paradise',
      featured: true,
      badge: 'Fast Delivery',
      discount: '20% off'
    },
    {
      id: 2,
      name: 'Burger King',
      cuisine: ['Burgers', 'Fast Food'],
      rating: 4.5,
      reviews: 1890,
      deliveryTime: 25,
      deliveryFee: 1.99,
      image: 'https://via.placeholder.com/400x300?text=Burger+King',
      featured: true,
      badge: 'Highest Rated'
    },
    {
      id: 3,
      name: 'Sushi Master',
      cuisine: ['Sushi', 'Japanese'],
      rating: 4.9,
      reviews: 3120,
      deliveryTime: 40,
      deliveryFee: 3.99,
      image: 'https://via.placeholder.com/400x300?text=Sushi+Master',
      featured: true
    },
    {
      id: 4,
      name: 'Dragon Wok',
      cuisine: ['Chinese', 'Asian'],
      rating: 4.6,
      reviews: 1450,
      deliveryTime: 30,
      deliveryFee: 2.49,
      image: 'https://via.placeholder.com/400x300?text=Dragon+Wok',
      discount: '15% off'
    }
  ];

  useEffect(() => {
    setRestaurants(mockRestaurants);
  }, []);

  const handleSearch = () => {
    if (!location) {
      toast.error('Please enter your location!');
      return;
    }
    toast.success(`Searching for food in ${location}!`);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          toast.success('Location detected! 📍');
        },
        error => toast.error('Could not get location')
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">🍕 Food Delivery</h1>
          <p className="text-xl opacity-90 mb-8">Order your favorite food from best restaurants near you</p>

          {/* Location Search */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-red-600 text-xl" />
                <input
                  type="text"
                  placeholder="Enter your location or city..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none text-gray-800 text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                <FaSearch className="inline mr-2" /> Search
              </button>
            </div>

            <button
              onClick={useCurrentLocation}
              className="text-white hover:opacity-80 transition font-semibold flex items-center gap-2"
            >
              <FaMapMarkerAlt /> Use Current Location
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Browse by Category</h2>
          <div className="flex overflow-x-auto gap-3 pb-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-orange-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaFire className="text-orange-600" /> Featured Restaurants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map(restaurant => (
              <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    {restaurant.discount && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                        {restaurant.discount}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {restaurant.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        {restaurant.rating} ({restaurant.reviews})
                      </span>
                    </div>

                    {/* Cuisine */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {restaurant.cuisine.join(' • ')}
                    </p>

                    {/* Delivery Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaClock /> {restaurant.deliveryTime} min
                      </div>
                      <span>${restaurant.deliveryFee}</span>
                    </div>

                    {restaurant.badge && (
                      <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                        {restaurant.badge}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Restaurants */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">All Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map(restaurant => (
              <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                <div className="bg-white dark:bg-slate-700 rounded-lg shadow hover:shadow-lg transition">
                  <div className="h-40 bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">
                      {restaurant.name}
                    </h4>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>{restaurant.rating} ⭐</span>
                      <span>{restaurant.deliveryTime} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDeliveryHome;