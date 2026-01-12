import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ REGISTER
export const registerApi = async (payload) => {
  return API.post("/register", payload);
};

// ✅ LOGIN
export const loginApi = async (payload) => {
  return API.post("/login", payload);
};
