import axios from "axios";

const API_BASE = "http://localhost:8080/api/conversations";

// 🔹 SAVE
export const saveConversation = (data) => {
  return axios.post(`${API_BASE}`, data);
};

// 🔹 GET BY BOT
export const getConversationsByBot = (botId) => {
  return axios.get(`${API_BASE}/bot/${botId}`);
};
