import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/cartSlice';
import { FaTrash, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

function FoodCart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const deliveryFee = 2.99;
  const tax = (total * 0.08).toFixed(2);
  const grandTotal = (parseFloat(total) + parseFloat(deliveryFee) + parseFloat(tax)).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Your cart is empty!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-xl">
            Add some delicious food to get started
          </p>
          <Link
            to="/"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">🛒 Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-orange-100 dark:bg-orange-900">
                    <tr>
                      <th className="text-left p-4 font-bold">Item</th>
                      <th className="text-left p-4 font-bold">Price</th>
                      <th className="text-left p-4 font-bold">Qty</th>
                      <th className="text-left p-4 font-bold">Total</th>
                      <th className="text-left p-4 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-t border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600">
                        <td className="p-4 font-semibold text-gray-800 dark:text-white">
                          {item.name}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => dispatch(updateQuantity({
                              productId: item.id,
                              quantity: parseInt(e.target.value)
                            }))}
                            className="w-16 px-2 py-1 border border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded text-center"
                          />
                        </td>
                        <td className="p-4 font-bold text-orange-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              dispatch(removeFromCart(item.id));
                              toast.success('Item removed!');
                            }}
                            className="text-red-600 hover:text-red-800 text-lg"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Delivery:</span>
                <span>${deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Tax:</span>
                <span>${tax}</span>
              </div>

              <div className="border-t border-gray-300 dark:border-slate-600 pt-3">
                <div className="flex justify-between text-2xl font-bold text-orange-600">
                  <span>Total:</span>
                  <span>${grandTotal}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-lg mb-3">
              <FaCheckCircle /> Proceed to Checkout
            </button>

            <button
              onClick={() => {
                dispatch(clearCart());
                toast.success('Cart cleared!');
              }}
              className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-slate-600 font-bold py-2 rounded-lg transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCart;