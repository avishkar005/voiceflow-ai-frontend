import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Clock, Activity, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useBots } from '../hooks/useBots';
import { useConversations } from '../hooks/useConversations';

export default function Dashboard() {
  const { darkMode, setCurrentPage } = useApp();
  const { bots } = useBots();
  const { conversations } = useConversations();

  const stats = [
    { 
      label: 'Total Bots', 
      value: bots.length, 
      change: '+12%', 
      icon: Bot, 
      color: 'violet',
      bgColor: 'bg-violet-500/10',
      textColor: 'text-violet-500'
    },
    { 
      label: 'Conversations', 
      value: '479', 
      change: '+23%', 
      icon: MessageSquare, 
      color: 'fuchsia',
      bgColor: 'bg-fuchsia-500/10',
      textColor: 'text-fuchsia-500'
    },
    { 
      label: 'Avg Duration', 
      value: '4m 52s', 
      change: '+8%', 
      icon: Clock, 
      color: 'cyan',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-500'
    },
    { 
      label: 'Active Now', 
      value: '12', 
      change: '+3', 
      icon: Activity, 
      color: 'emerald',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-500'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} rounded-xl border p-6 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-1`}>{stat.label}</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bots */}
        <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Bots</h3>
            <button
              onClick={() => setCurrentPage('bots')}
              className={`text-sm ${darkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'} font-medium transition-colors`}
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {bots.slice(0, 3).map((bot) => (
              <div 
                key={bot.id} 
                className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-gray-50 hover:bg-gray-100'} transition-colors cursor-pointer`}
                onClick={() => setCurrentPage('bots')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bot.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      {bot.conversations} conversations
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-slate-600' : 'text-gray-400'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
            <button
              onClick={() => setCurrentPage('conversations')}
              className={`text-sm ${darkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'} font-medium transition-colors`}
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {conversations.slice(0, 3).map((conv) => (
              <div 
                key={conv.id} 
                className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-gray-50 hover:bg-gray-100'} transition-colors cursor-pointer`}
                onClick={() => setCurrentPage('conversations')}
              >
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{conv.botName}</p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{conv.date}</p>
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {conv.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}