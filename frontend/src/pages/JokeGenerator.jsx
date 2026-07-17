import React, { useState, useEffect } from 'react';
import { FaLaugh, FaSync, FaShare2, FaCopy, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { toast } from 'react-toastify';

function JokeGenerator() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState('any');
  const [showFavorites, setShowFavorites] = useState(false);
  const [jokesHistory, setJokesHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, shared: 0, laughed: 0 });

  const categories = ['any', 'general', 'knock-knock', 'programming'];

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteJokes');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }

    const savedHistory = localStorage.getItem('jokesHistory');
    if (savedHistory) {
      try {
        setJokesHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }

    const savedStats = localStorage.getItem('jokeStats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Error loading stats:', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('jokesHistory', JSON.stringify(jokesHistory));
  }, [jokesHistory]);

  useEffect(() => {
    localStorage.setItem('jokeStats', JSON.stringify(stats));
  }, [stats]);

  // Fetch joke from API
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const url = category === 'any'
        ? 'https://official-joke-api.appspot.com/random_joke'
        : `https://official-joke-api.appspot.com/jokes/${category}/random`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('API Error');

      const data = await response.json();

      const jokeObj = {
        id: Date.now(),
        setup: data.setup,
        punchline: data.punchline,
        type: data.type,
        category: data.category || category,
        fetchedAt: new Date().toLocaleString(),
        liked: false
      };

      setJoke(jokeObj);

      // Update history
      const newHistory = [jokeObj, ...jokesHistory].slice(0, 50);
      setJokesHistory(newHistory);

      // Update stats
      setStats(prev => ({ ...prev, total: prev.total + 1 }));

      toast.success('New joke loaded! 😄');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch joke. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    if (!joke) return;
    if (favorites.some(j => j.id === joke.id)) {
      toast.info('Already in favorites!');
      return;
    }
    setFavorites([...favorites, joke]);
    toast.success('Added to favorites! ⭐');
  };

  const removeFromFavorites = (jokeId) => {
    setFavorites(favorites.filter(j => j.id !== jokeId));
    toast.success('Removed from favorites!');
  };

  const copyToClipboard = () => {
    if (!joke) return;
    const text = `${joke.setup}\n\n${joke.punchline}`;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard! 📋');
  };

  const shareJoke = async () => {
    if (!joke) return;
    const text = `${joke.setup}\n${joke.punchline}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this funny joke!',
          text: text
        });
        setStats(prev => ({ ...prev, shared: prev.shared + 1 }));
        toast.success('Shared! 📤');
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyToClipboard();
    }
  };

  const getJokeText = (j) => `${j.setup}\n${j.punchline}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaLaugh className="text-7xl mx-auto mb-4 text-purple-600 animate-bounce" />
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
            😂 Joke Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Powered by Official Joke API - Get a laugh instantly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Selector */}
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📂 Choose Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-3 rounded-lg font-bold transition text-sm md:text-base ${
                      category === cat
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'any' ? '🎲 Any' : cat === 'general' ? '😄 General' : cat === 'knock-knock' ? '🚪 Knock' : '💻 Code'}
                  </button>
                ))}
              </div>
            </div>

            {/* Joke Display */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-2xl p-8 text-white min-h-96 flex flex-col justify-center hover:shadow-3xl transition">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-white border-b-purple-300 mx-auto mb-4"></div>
                  <p className="text-xl font-semibold">Fetching joke from API...</p>
                </div>
              ) : joke ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-lg font-semibold mb-3 opacity-90">❓ The Setup:</p>
                    <p className="text-3xl md:text-4xl font-bold leading-relaxed">{joke.setup}</p>
                  </div>
                  <div className="border-t-2 border-white opacity-30 my-4"></div>
                  <div>
                    <p className="text-lg font-semibold mb-3 opacity-90">💡 The Punchline:</p>
                    <p className="text-3xl md:text-5xl font-bold text-yellow-300">{joke.punchline}</p>
                  </div>
                  <p className="text-sm opacity-75 mt-6">
                    📂 {joke.category.charAt(0).toUpperCase() + joke.category.slice(1)} | 🏷️ {joke.type}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <FaLaugh className="text-6xl mx-auto mb-4 opacity-50" />
                  <p className="text-2xl font-semibold">Click "Get Joke" to start laughing! 🎊</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <button
                onClick={fetchJoke}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-3 text-lg shadow-lg"
              >
                <FaSync className={loading ? 'animate-spin' : ''} />
                {loading ? 'Loading...' : 'Get New Joke'}
              </button>

              {joke && (
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={addToFavorites}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <FaThumbsUp className="text-lg" />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <FaCopy className="text-lg" />
                    <span className="hidden sm:inline">Copy</span>
                  </button>
                  <button
                    onClick={shareJoke}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <FaShare2 className="text-lg" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">📊 Your Stats</h3>
              <div className="space-y-4">
                <StatItem label="Jokes Loaded" value={stats.total} icon="🎲" />
                <StatItem label="Saved" value={favorites.length} icon="⭐" />
                <StatItem label="Shared" value={stats.shared} icon="📤" />
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">⭐ Favorites</h3>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {favorites.length}
                </span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {favorites.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No favorites yet!</p>
                ) : (
                  favorites.map(fav => (
                    <div
                      key={fav.id}
                      className="bg-gray-100 dark:bg-slate-600 p-3 rounded-lg group hover:bg-gray-200 dark:hover:bg-slate-500 transition"
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-300 line-clamp-3 cursor-pointer">
                        {getJokeText(fav)}
                      </p>
                      <button
                        onClick={() => removeFromFavorites(fav.id)}
                        className="text-xs text-red-600 hover:text-red-800 mt-2 opacity-0 group-hover:opacity-100 transition font-semibold"
                      >
                        Remove ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Jokes */}
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">🕐 Recent (Last 5)</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {jokesHistory.slice(0, 5).map((j, idx) => (
                  <button
                    key={j.id}
                    onClick={() => setJoke(j)}
                    className="w-full text-left text-sm bg-gray-100 dark:bg-slate-600 p-3 rounded hover:bg-gray-200 dark:hover:bg-slate-500 transition font-semibold text-gray-800 dark:text-gray-300"
                  >
                    {idx + 1}. {j.setup.slice(0, 40)}...
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="mb-2">✨ Powered by <a href="https://official-joke-api.appspot.com" className="text-blue-600 hover:underline font-semibold" target="_blank" rel="noopener noreferrer">Official Joke API</a></p>
          <p>💾 All your data is saved locally in your browser</p>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold">{icon} {label}</span>
      <span className="text-3xl font-bold">{value}</span>
    </div>
  );
}

export default JokeGenerator;