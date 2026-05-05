import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ShoppingCart, ChevronDown } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCartStore } from '../store/useCartStore';

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const addItem = useCartStore(state => state.addItem);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">Catalog</h1>
          <p className="text-gray-500">Discover our carefully curated collection.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-full h-12 w-full md:w-auto overflow-x-auto no-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSearchParams({ category })}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-white shadow-sm text-black' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-3xl mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => addItem(product)}
                    className="w-full bg-white text-black py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <span className="font-bold">${product.price}</span>
                </div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{product.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-gray-400 italic">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
