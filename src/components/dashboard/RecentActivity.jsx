export default function RecentActivity({ conversations }) {
  return (
    <div className="space-y-3">
      {conversations.map((c) => (
        <div key={c.id} className="flex justify-between bg-slate-800 p-3 rounded-lg">
          <span className="text-white">{c.botName}</span>
          <span className="text-slate-400">{c.duration}</span>
        </div>
      ))}
    </div>
  );
}
