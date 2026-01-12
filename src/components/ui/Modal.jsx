export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-white">✕</button>
        {children}
      </div>
    </div>
  );
}
