import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const {
    currentPage,
    darkMode,
    setDarkMode,
    user,
    setCurrentPage,
  } = useApp();

  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const getInitials = (name) =>
    name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : 'U';

  return (
    <header
      className={`h-16 flex items-center justify-between px-6 border-b ${
        darkMode
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-gray-200'
      }`}
    >
      <h2 className="text-xl font-semibold capitalize">{currentPage}</h2>

      <div className="flex items-center gap-4 relative">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg"
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>

        {/* Profile Avatar */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white font-medium"
        >
          {getInitials(user?.name)}
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className={`absolute right-0 top-14 w-40 rounded-xl border shadow-lg z-50 ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <button
              onClick={() => {
                setCurrentPage('settings');
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-violet-600 hover:text-white rounded-t-xl"
            >
              Profile
            </button>

            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white rounded-b-xl"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
