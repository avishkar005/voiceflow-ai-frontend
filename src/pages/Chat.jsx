import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const userMsg = { role: "user", text: input };

    const botReply = {
      role: "assistant",
      text: getBotReply(input),
    };

    setMessages([...messages, userMsg, botReply]);
    setInput("");
  };

  const getBotReply = (text) => {
    const knowledge = {
      "hello": "Hello! How can I help you?",
      "pricing": "Our pricing starts at ₹999/month.",
      "support": "You can reach support at support@voiceflow.ai",
    };

    return knowledge[text.toLowerCase()] || "Sorry, I didn’t understand that.";
  };

  return (
    <div>
      {messages.map((m, i) => (
        <p key={i}><b>{m.role}:</b> {m.text}</p>
      ))}

      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
