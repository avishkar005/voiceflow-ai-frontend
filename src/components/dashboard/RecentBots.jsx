import { Bot } from 'lucide-react';

export default function RecentBots({ bots }) {
  return (
    <div className="space-y-3">
      {bots.map((bot) => (
        <div key={bot.id} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg">
          <Bot className="text-violet-500" />
          <div>
            <p className="text-white font-medium">{bot.name}</p>
            <p className="text-slate-400 text-sm">{bot.conversations} conversations</p>
          </div>
        </div>
      ))}
    </div>
  );
}
