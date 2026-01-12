import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // 👈 START LOGGED OUT
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentPage,
        setCurrentPage,
        darkMode,
        setDarkMode,
        sidebarCollapsed,
        setSidebarCollapsed,
        selectedBot,
        setSelectedBot,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
