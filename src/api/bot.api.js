import axios from "axios";

const API = "http://localhost:8080/api/bots";

// ✅ GET all bots
export const getBotsApi = async () => {
  const res = await axios.get(API);
  return res.data;
};

// ✅ CREATE bot
export const createBot = async (bot) => {
  const res = await axios.post(API, bot);
  return res.data;
};
