import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, LogOut } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
              ZENITH
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/catalog" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                Shop
              </Link>
              <Link to="/catalog?category=Audio" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                Audio
              </Link>
              <Link to="/catalog?category=Timepieces" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                Watches
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-gray-600 hover:text-black transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            
            {isAuthenticated() ? (
              <div className="flex items-center gap-4">
                <span className="hidden lg:block text-sm font-medium text-gray-500">Hello, {user?.name.split(' ')[0]}</span>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-gray-600 hover:text-black transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}

            <Link to="/cart" className="p-2 text-gray-600 hover:text-black transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <button className="p-2 text-gray-600 hover:text-black transition-colors md:hidden">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
