import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../hooks/useAuth';

export default function Auth() {
  const { darkMode } = useApp();
  const { login, register, loading, error } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      await register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode ? 'bg-slate-950' : 'bg-gray-50'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-md rounded-2xl border p-8 shadow-xl ${
          darkMode
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-gray-200'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            VoiceFlow
          </h1>
          <p
            className={`mt-1 ${
              darkMode ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            {isLogin ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white transition-all disabled:opacity-60"
          >
            {loading
              ? 'Please wait...'
              : isLogin
              ? 'Sign In'
              : 'Create Account'}
          </motion.button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center text-sm">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-medium text-violet-600"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="font-medium text-violet-600"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
