import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from '../../pages/Dashboard';
import Bots from '../../pages/Bots';
import Conversations from '../../pages/Conversations';
import Settings from '../../pages/Settings';
import { useApp } from '../../context/AppContext';

export default function DashboardLayout() {
  const { currentPage, darkMode } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'bots':
        return <Bots />;
      case 'conversations':
        return <Conversations />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className={`flex-1 overflow-auto ${darkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}