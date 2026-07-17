import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import TodoList from './pages/TodoList';
import JokeGenerator from './pages/JokeGenerator';

// Redux
import store from './redux/store';
import { loadUser } from './redux/authSlice';

// Load user on app start
const token = localStorage.getItem('token');
if (token) {
  store.dispatch(loadUser(token));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              {/* Main E-Commerce Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />

              {/* New Utility Apps */}
              <Route path="/todos" element={<TodoList />} />
              <Route path="/jokes" element={<JokeGenerator />} />

              {/* 404 */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
                      <p className="text-gray-600 dark:text-gray-400 text-xl">Page not found</p>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </main>

          <Footer />
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;