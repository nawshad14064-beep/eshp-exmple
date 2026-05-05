import { motion } from 'motion/react';
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-6">Your cart is empty</h1>
        <p className="text-gray-500 mb-10">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/catalog" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id}
              className="flex gap-6 pb-8 border-b border-gray-100"
            >
              <div className="w-32 h-40 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow py-2">
                <div className="flex justify-between mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-500 text-sm mb-6 uppercase tracking-wider">{item.category}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 bg-gray-50 rounded-full p-1 border border-gray-100">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold tabular-nums min-w-[1.5rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xl font-bold">${item.price * item.quantity}</span>
                </div>
              </div>
            </motion.div>
          ))}
          <button 
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-black font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-bold mb-8">Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${totalPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${totalPrice()}</span>
              </div>
            </div>
            <button className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity mb-4">
              <CreditCard className="w-5 h-5" /> Checkout
            </button>
            <p className="text-xs text-center text-gray-400">
              Tax included. Secure encrypted payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
