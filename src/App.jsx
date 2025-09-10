import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProfileModal from "./components/AdminPages/ProfileModal";
import AppRoutes from "./Routes/AppRoutes";
import LoginPage from "./components/AdminPages/LoginPage";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeProfileSection, setActiveProfileSection] = useState("profile");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  // if (!isLoggedIn) {
  //   return <LoginPage onLogin={handleLogin} isDarkMode={isDarkMode} />;
  // }

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`flex h-screen transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar isDarkMode={isDarkMode} />

      <div className="flex flex-col flex-1">
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onProfileClick={() => setIsProfileModalOpen(true)}
        />
        <div className="flex-1 p-6 overflow-y-auto">
          <AppRoutes isDarkMode={isDarkMode} />
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        isDarkMode={isDarkMode}
        activeSection={activeProfileSection}
        setActiveSection={setActiveProfileSection}
      />
    </div>
  );
}
