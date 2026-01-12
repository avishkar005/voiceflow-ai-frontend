
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useBots } from "../hooks/useBots";
import BotForm from "../components/bots/BotForm";
import BotCard from "../components/bots/BotCard";

export default function Bots() {
  const { darkMode } = useApp();
  const { bots } = useBots();
  const [showCreateBot, setShowCreateBot] = useState(false);

  if (showCreateBot) {
    return <BotForm onBack={() => setShowCreateBot(false)} />;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : ""}`}>
            Voice Bots
          </h2>
        </div>

        <button
          onClick={() => setShowCreateBot(true)}
          className="bg-violet-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="inline mr-2" />
          Create Bot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bots.map((bot, idx) => (
          <BotCard key={bot.id || bot._id} bot={bot} index={idx} />
        ))}
      </div>
    </div>
  );
}
