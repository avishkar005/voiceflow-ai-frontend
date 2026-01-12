import { motion } from "framer-motion";
import { Bot, Play } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function BotCard({ bot, index }) {
  const { darkMode, setSelectedBot, setCurrentPage } = useApp();

  const startConversation = () => {
    setSelectedBot(bot);
    setCurrentPage("conversations");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`border rounded-xl p-6 ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center mb-4">
        <Bot className="text-white" />
      </div>

      <h3 className="text-lg font-semibold">{bot.name}</h3>

      <button
        onClick={startConversation}
        className="mt-4 w-full bg-violet-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
      >
        <Play size={16} />
        Start Conversation
      </button>
    </motion.div>
  );
}
