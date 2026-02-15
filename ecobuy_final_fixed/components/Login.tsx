
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin(email, name || 'Eco Explorer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30" />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 relative z-10 border border-green-100">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900 font-heading">EcoBuy</h1>
          <p className="text-gray-500 mt-2">{isSignup ? 'Start your sustainable journey' : 'Welcome back, Eco Warrior'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all"
              placeholder="eco@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95"
          >
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm font-bold text-green-600 hover:text-green-700"
          >
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;