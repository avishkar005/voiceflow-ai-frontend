import { useState } from 'react';

export function useConversations() {
  const [conversations, setConversations] = useState([]);

  const addMessage = (conversationId, message) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, message] }
          : c
      )
    );
  };

  const createConversation = (bot) => {
    const convo = {
      id: Date.now().toString(),
      botId: bot.id,
      botName: bot.name,
      createdAt: new Date().toISOString(),
      messages: [],
    };

    setConversations((prev) => [convo, ...prev]);
    return convo;
  };

  return { conversations, addMessage, createConversation };
}
