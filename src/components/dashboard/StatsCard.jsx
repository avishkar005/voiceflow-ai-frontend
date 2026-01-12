export default function StatsCard({ icon: Icon, label, value, change, color }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-6 h-6 text-${color}-500`} />
        <span className="text-xs text-emerald-500">{change}</span>
      </div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
