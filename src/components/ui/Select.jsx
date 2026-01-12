export default function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
    >
      {children}
    </select>
  );
}
