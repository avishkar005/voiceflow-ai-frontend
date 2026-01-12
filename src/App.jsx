import { useApp } from "./context/AppContext";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/layout/DashboardLayout";

export default function App() {
  const { user } = useApp();

  // 🔐 Route guard
  if (!user) {
    return <Auth />;
  }

  return <DashboardLayout />;
}
