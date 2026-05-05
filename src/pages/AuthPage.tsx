import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function AuthPage({ mode = 'login' }: { mode?: 'login' | 'register' | 'forgot' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const endpoint = mode === 'register' ? '/api/auth/register' : 
                      mode === 'forgot' ? '/api/auth/forgot-password' : 
                      '/api/auth/login';
      
      const body = mode === 'register' ? { email, password, name } : { email, password };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      if (mode === 'forgot') {
        setMessage(data.message);
      } else {
        setAuth(data.user, data.token);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to store
        </Link>

        <h2 className="text-3xl font-bold mb-2">
          {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Join Zenith' : 'Reset Password'}
        </h2>
        <p className="text-gray-500 mb-8">
          {mode === 'login' ? 'Please enter your details to sign in.' : 
           mode === 'register' ? 'Create an account to start shopping.' : 
           'Enter your email to receive reset instructions.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          {message && <p className="text-green-600 text-sm font-medium">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 
             mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Instructions'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-4">
          {mode === 'login' && (
            <>
              <p className="text-sm text-gray-500">
                Don't have an account? <Link to="/register" className="text-black font-bold">Sign up</Link>
              </p>
              <Link to="/forgot-password" size="sm" className="text-sm text-gray-400 hover:text-black">Forgot password?</Link>
            </>
          )}
          {mode === 'register' && (
            <p className="text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-black font-bold">Sign in</Link>
            </p>
          )}
          {mode === 'forgot' && (
            <p className="text-sm text-gray-500">
              Back to <Link to="/login" className="text-black font-bold">Sign in</Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
