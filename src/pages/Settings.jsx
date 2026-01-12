import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { darkMode, user } = useApp();
  const [copied, setCopied] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || 'Avishkar Kale',
    email: user?.email || 'avishkar@voiceflow.ai',
    phone: '',
    newPassword: '',
    confirmPassword: '',
  });

  // ✅ SAFE: API key from environment variable
  const apiKey =
    import.meta.env.VITE_STRIPE_KEY
      ? `sk_live_${'•'.repeat(24)}`
      : 'No API key set';

  const handleCopy = () => {
    if (!import.meta.env.VITE_STRIPE_KEY) return;

    navigator.clipboard.writeText(import.meta.env.VITE_STRIPE_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Saving profile:', profile);
    // API call can be added later
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
          Settings
        </h2>
        <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Manage your account and preferences
        </p>
      </div>

      <div className="space-y-6">

        {/* Profile Section */}
        <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Profile
          </h3>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                New Password
              </label>
              <input
                type="password"
                value={profile.newPassword}
                onChange={(e) => handleProfileChange('newPassword', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <input
                type="password"
                value={profile.confirmPassword}
                onChange={(e) => handleProfileChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border`}
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="px-6 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* API Keys Section */}
        <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            API Keys
          </h3>

          <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} rounded-lg`}>
            <code className={`text-sm font-mono ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              {apiKey}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg"
              disabled={!import.meta.env.VITE_STRIPE_KEY}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
