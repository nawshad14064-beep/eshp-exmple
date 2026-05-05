import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="bg-gray-50 border-t border-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">ZENITH</h3>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
              Curating high-end lifestyle products for the discerning individual. 
              Precision, minimalism, and timeless design in every piece.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Zenith Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
