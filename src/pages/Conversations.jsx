import React, { useEffect, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import { askGemini } from "../api/gemini.api";
import {
  saveConversation,
  getConversationsByBot,
} from "../api/conversation.api";

export default function Conversations() {
  const { darkMode, selectedBot } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);

  // ✅ Load conversation ONLY when bot is selected
  useEffect(() => {
    if (!selectedBot) return;

    getConversationsByBot(selectedBot.id || selectedBot._id).then((res) => {
      if (res && res.length > 0) {
        setConversationId(res[0].id || res[0]._id);
        setMessages(res[0].messages || []);
      } else {
        setMessages([]);
        setConversationId(null);
      }
    });
  }, [selectedBot]);

  // 🧠 Simple AI (dummy, extendable to Gemini)
  const getBotReply = (text) => {
    const t = text.toLowerCase();
    if (t.includes("hello")) return "Hello! How can I help you?";
    if (t.includes("price")) return "Pricing depends on usage.";
    if (t.includes("appointment")) return "I can help schedule that.";
    return "Got it 👍";
  };

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = { role: "user", content: input };

  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  const aiReply = await askGemini(input);

  const botMsg = { role: "assistant", content: aiReply };

  const updated = [...messages, userMsg, botMsg];
  setMessages(updated);

  await saveConversation({
    id: conversationId,
    botId: selectedBot.id || selectedBot._id,
    messages: updated,
    updatedAt: new Date(),
  });
};


  // ✅ EMPTY STATE (instead of redirect)
  if (!selectedBot) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        Select a bot to start a conversation
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={`border-b p-4 ${
          darkMode ? "border-slate-800" : "border-gray-200"
        }`}
      >
        <h2 className="text-xl font-semibold">
          Talking to{" "}
          <span className="text-violet-600">{selectedBot.name}</span>
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] ${
                msg.role === "user"
                  ? "bg-violet-600 text-white"
                  : darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-gray-100"
              }`}
            >
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className={`border-t p-4 ${
          darkMode ? "border-slate-800" : "border-gray-200"
        }`}
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={sendMessage}
            className="bg-violet-600 text-white px-4 py-2 rounded-xl"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
