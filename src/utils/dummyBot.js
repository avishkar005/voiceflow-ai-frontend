export const dummyBotReply = (message) => {
  const text = message.toLowerCase();

  const rules = [
    { keywords: ['hello', 'hi', 'hey'], reply: 'Hello! How can I help you today?' },
    { keywords: ['price', 'cost'], reply: 'Our pricing depends on your plan. Would you like details?' },
    { keywords: ['support'], reply: 'I can help you with customer support and issue resolution.' },
    { keywords: ['appointment', 'booking'], reply: 'Sure! I can help you book an appointment.' },
    { keywords: ['hours', 'time'], reply: 'Our support is available 24/7.' },
    { keywords: ['bye', 'goodbye'], reply: 'Goodbye! Have a great day.' },
  ];

  for (const rule of rules) {
    if (rule.keywords.some((k) => text.includes(k))) {
      return rule.reply;
    }
  }

  return "I'm still learning. Can you please rephrase that?";
};
