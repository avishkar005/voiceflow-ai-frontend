import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { createBot } from "../../api/bot.api";

export default function BotForm({ onBack }) {
  const { darkMode, user } = useApp();

  const [form, setForm] = useState({
    name: "",
    voice: "Female",
    model: "Gemini Pro",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name.trim()) return;

    setLoading(true);

    await createBot({
      ...form,
      userId: user.id || user._id,
    });

    setLoading(false);
    onBack();
  };

  return (
    <div className="max-w-xl">
      <button onClick={onBack} className="flex gap-2 mb-6">
        <ArrowLeft size={16} />
        Back
      </button>

      <div
        className={`border rounded-xl p-6 ${
          darkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <input
          placeholder="Bot Name"
          className="w-full border p-2 mb-4"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="w-full border p-2 mb-4"
          onChange={(e) => setForm({ ...form, voice: e.target.value })}
        >
          <option>Female</option>
          <option>Male</option>
        </select>

        <select
          className="w-full border p-2 mb-4"
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        >
          <option>Gemini Pro</option>
          <option>Gemini Flash</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-violet-600 text-white py-2 rounded-lg"
        >
          {loading ? "Creating..." : "Create Bot"}
        </button>
      </div>
    </div>
  );
}
