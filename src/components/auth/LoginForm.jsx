import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../context/AppContext';

export default function LoginForm({ switchMode }) {
  const { darkMode } = useApp();
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    await login(form.get('email'), form.get('password'));
  };

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          required
          className={`w-full px-4 py-3 rounded-xl ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          } border outline-none focus:ring-2 focus:ring-violet-500`}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className={`w-full px-4 py-3 rounded-xl ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          } border outline-none focus:ring-2 focus:ring-violet-500`}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </motion.button>
      </form>

      <p className="mt-6 text-sm text-center text-slate-400">
        Don’t have an account?{' '}
        <button onClick={switchMode} className="text-violet-500 font-medium">
          Sign up
        </button>
      </p>
    </>
  );
}
