import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCartStore } from '../store/useCartStore';

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.featured);
  const addItem = useCartStore(state => state.addItem);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000&auto=format&fit=crop" 
            alt="Zenith Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] font-bold mb-6 text-gray-300"
          >
            Spring Collection 2026
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
          >
            ELEVATE YOUR <br /> EVERYDAY
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/catalog" 
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Shop Collection <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Featured Products</span>
            <h2 className="text-4xl font-bold mt-2">Selected for you</h2>
          </div>
          <Link to="/catalog" className="text-sm font-bold border-b-2 border-black pb-1 hover:opacity-70 transition-opacity">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4 rounded-2xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => addItem(product)}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-black hover:text-white"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="font-bold">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="bg-gray-50 py-32 px-4 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-8 h-8 mx-auto mb-8 text-black" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            "Design is not just what it looks like and feels like. Design is how it works."
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            Every piece in our collection is carefully selected for its functional excellence and aesthetic purity. We believe in products that last generations, not seasons.
          </p>
        </div>
      </section>
    </div>
  );
}
