// src/services/botService.js
export async function createBot(bot) {
  const res = await fetch("http://localhost:8080/api/bots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bot),
  });

  return res.json();
}
