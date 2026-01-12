import { useEffect, useState } from "react";
import { getBotsApi } from "../api/bot.api";
import { useApp } from "../context/AppContext";

export const useBots = () => {
  const { user } = useApp();
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;

    setLoading(true);

    getBotsApi(user._id)
      .then((res) => {
        setBots(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch bots", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return { bots, loading };
};
