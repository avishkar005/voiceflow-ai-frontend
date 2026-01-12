import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  const {
    currentPage,
    setCurrentPage,
    sidebarCollapsed,
    setSidebarCollapsed,
    darkMode,
  } = useApp();

  const { logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bots', label: 'Voice Bots', icon: Bot },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 256 }}
      className={`${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
      } border-r flex flex-col h-screen transition-all`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-inherit">
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span
              className={`font-bold text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              VoiceFlow
            </span>
          </motion.div>
        )}

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`p-2 rounded-lg ${
            darkMode
              ? 'hover:bg-slate-800 text-slate-400'
              : 'hover:bg-gray-100 text-gray-600'
          } transition-colors`}
        >
          {sidebarCollapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                : darkMode
                ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div
        className={`p-3 border-t ${
          darkMode ? 'border-slate-800' : 'border-gray-200'
        }`}
      >
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
            darkMode
              ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
