import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  MessageSquare,
  Maximize2,
  Settings,
  Moon,
  Sun,
  LayoutDashboard,
  Gamepad2,
  FileText,
  Users,
  CreditCard,
  Wallet,
  BarChart3,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  Shield,
  Clock,
  X,
  Check,
  Eye,
  Trash2,
  Mail,
  AlertCircle,
  Database,
  Globe,
  Lock,
  Palette,
  UserCog,
  Activity,
  Phone,
  MapPin,
  Calendar,
  Badge
} from "lucide-react";

// Sample logo placeholder - replace with your actual logo
const playzeloLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%234F46E5'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-family='Arial' font-size='16' font-weight='bold'%3EP%3C/text%3E%3C/svg%3E";

// Header Component
const Header = ({ isDarkMode, toggleDarkMode, onLogout, onProfileClick }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminDetailsOpen, setIsAdminDetailsOpen] = useState(false);

  const notificationRef = useRef(null);
  const messageRef = useRef(null);
  const profileRef = useRef(null);
  const settingsRef = useRef(null);
  const adminRef = useRef(null);

  // Sample admin details
  const adminDetails = {
    name: "PlayZelo Admin",
    email: "admin@playzelo.com",
    role: "Super Administrator",
    department: "System Management",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    joinDate: "January 15, 2023",
    lastLogin: "Today, 2:30 PM",
    permissions: ["Full Access", "User Management", "Financial Controls", "System Settings"],
    status: "Online"
  };

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New user registered",
      message: "John Doe just signed up to your platform",
      time: "2 minutes ago",
      type: "user",
      read: false,
      icon: Users
    },
    {
      id: 2,
      title: "Payment received",
      message: "$1,250 deposit from Sarah Wilson",
      time: "15 minutes ago", 
      type: "payment",
      read: false,
      icon: CreditCard
    },
    {
      id: 3,
      title: "System alert",
      message: "Server maintenance scheduled for tonight",
      time: "1 hour ago",
      type: "alert",
      read: true,
      icon: AlertCircle
    },
    {
      id: 4,
      title: "Game update",
      message: "New slot game added to your platform",
      time: "3 hours ago",
      type: "game",
      read: true,
      icon: Gamepad2
    }
  ];

  // Sample messages data
  const messages = [
    {
      id: 1,
      name: "Alex Johnson",
      message: "Hey, I need help with my account withdrawal...",
      time: "5 min ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      unread: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      message: "Thank you for the quick support response!",
      time: "20 min ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=40&h=40&fit=crop&crop=face",
      unread: true
    },
    {
      id: 3,
      name: "Mike Brown",
      message: "Can you check my game history please?",
      time: "1 hour ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      unread: false
    },
    {
      id: 4,
      name: "Emma Davis",
      message: "The new slot games are amazing! Great work.",
      time: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      unread: false
    }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setIsMessageOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
      if (adminRef.current && !adminRef.current.contains(event.target)) {
        setIsAdminDetailsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Handle profile menu clicks
  const handleProfileMenuClick = (section) => {
    setIsProfileOpen(false);
    if (section === 'logout') {
      onLogout();
    } else {
      onProfileClick(section);
    }
  };

  // Handle settings menu clicks
  const handleSettingsMenuClick = (section) => {
    setIsSettingsOpen(false);
    if (section === 'logout') {
      onLogout();
    } else {
      onProfileClick(section);
    }
  };

  // Add rotation CSS for settings icon
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fast-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .rotate-fast {
        animation: fast-spin 1s linear infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <header className={`border-b px-6 py-3 transition-all duration-300 relative z-50 ${
      isDarkMode
        ? 'bg-gray-900 border-gray-700 text-white'
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blinking-text {
          animation: blink 1s cubic-bezier(0.5, 0, 1, 1) infinite;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 2px;
        }
      `}</style>

      <div className="flex items-center justify-between">
        {/* Search Box */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search here..."
              className={`pl-12 pr-4 py-3 w-96 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen);
                setIsMessageOpen(false);
                setIsProfileOpen(false);
                setIsSettingsOpen(false);
                setIsAdminDetailsOpen(false);
              }}
              className={`relative p-3 rounded-full transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${isNotificationOpen ? 'ring-2 ring-blue-500' : ''}`}
            >
              <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center blinking-text">
                {notifications.filter(n => !n.read).length}
              </span>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className={`absolute right-0 mt-2 w-96 rounded-2xl shadow-2xl border backdrop-blur-lg z-50 ${
                isDarkMode 
                  ? 'bg-gray-800/95 border-gray-700' 
                  : 'bg-white/95 border-gray-200'
              }`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Notifications
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-blue-500 hover:text-blue-600">
                        Mark all read
                      </button>
                      <button 
                        onClick={() => setIsNotificationOpen(false)}
                        className={`p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto scrollbar-thin">
                  {notifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            notification.type === 'user' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                            notification.type === 'payment' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                            notification.type === 'alert' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                            'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                <Clock className="w-3 h-3 inline mr-1" />
                                {notification.time}
                              </span>
                              <div className="flex items-center space-x-2">
                                <button className="text-xs text-blue-500 hover:text-blue-600">
                                  <Eye className="w-3 h-3" />
                                </button>
                                <button className="text-xs text-red-500 hover:text-red-600">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-center text-sm text-blue-500 hover:text-blue-600 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="relative" ref={messageRef}>
            <button
              onClick={() => {
                setIsMessageOpen(!isMessageOpen);
                setIsNotificationOpen(false);
                setIsProfileOpen(false);
                setIsSettingsOpen(false);
                setIsAdminDetailsOpen(false);
              }}
              className={`relative p-3 rounded-full transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${isMessageOpen ? 'ring-2 ring-blue-500' : ''}`}
            >
              <MessageSquare className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center blinking-text">
                {messages.filter(m => m.unread).length}
              </span>
            </button>

            {/* Messages Dropdown */}
            {isMessageOpen && (
              <div className={`absolute right-0 mt-2 w-96 rounded-2xl shadow-2xl border backdrop-blur-lg z-50 ${
                isDarkMode 
                  ? 'bg-gray-800/95 border-gray-700' 
                  : 'bg-white/95 border-gray-200'
              }`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Messages
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-blue-500 hover:text-blue-600">
                        New message
                      </button>
                      <button 
                        onClick={() => setIsMessageOpen(false)}
                        className={`p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto scrollbar-thin">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                        message.unread ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <img 
                            src={message.avatar} 
                            alt={message.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {message.unread && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {message.name}
                            </p>
                            <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              {message.time}
                            </span>
                          </div>
                          <p className={`text-sm mt-1 truncate ${
                            message.unread 
                              ? isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {message.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <button className="text-xs text-blue-500 hover:text-blue-600">
                                Reply
                              </button>
                              <button className="text-xs text-gray-500 hover:text-gray-600">
                                Archive
                              </button>
                            </div>
                            {message.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-center text-sm text-blue-500 hover:text-blue-600 font-medium">
                    <Mail className="w-4 h-4 inline mr-2" />
                    View all messages
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullScreen}
            className={`p-3 rounded-full transition-colors ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Maximize2 className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              className={`flex items-center space-x-3 border-r pr-4 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } ${isAdminDetailsOpen ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="relative" ref={adminRef}>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={playzeloLogo}
                    alt="User Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  PlayZelo
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Admin
                </div>
              </div>
            </button>
          </div>

          {/* Settings */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen);
                setIsNotificationOpen(false);
                setIsMessageOpen(false);
                setIsProfileOpen(false);
                setIsAdminDetailsOpen(false);
              }}
              className={`p-3 rounded-full transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${isSettingsOpen ? 'ring-2 ring-blue-500' : ''}`}
            >
              <Settings className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ${
                isSettingsOpen ? 'rotate-fast' : ''
              }`} />
            </button>

            {/* Settings Dropdown */}
            {isSettingsOpen && (
              <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border backdrop-blur-lg z-50 ${
                isDarkMode 
                  ? 'bg-gray-800/95 border-gray-700' 
                  : 'bg-white/95 border-gray-200'
              }`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Settings
                    </h3>
                    <button 
                      onClick={() => setIsSettingsOpen(false)}
                      className={`p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-2">
                  <button onClick={() => handleSettingsMenuClick('profile')} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <User className="w-5 h-5" />
                    <span>My Profile</span>
                  </button>

                  <button onClick={() => handleSettingsMenuClick('account')} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <UserCog className="w-5 h-5" />
                    <span>Account Settings</span>
                  </button>

                  <button onClick={() => handleSettingsMenuClick('security')} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </button>

                  <button onClick={() => handleSettingsMenuClick('analytics')} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <BarChart3 className="w-5 h-5" />
                    <span>Analytics</span>
                  </button>

                  <button onClick={() => handleSettingsMenuClick('database')} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Database className="w-5 h-5" />
                    <span>Database</span>
                  </button>

                  <button onClick={() => handleSettingsMenuClick('general')} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Globe className="w-5 h-5" />
                    <span>General Settings</span>
                  </button>

                  <button onClick={() => handleSettingsMenuClick('privacy')} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Lock className="w-5 h-5" />
                    <span>Privacy Settings</span>
                  </button>

                  <button onClick={() => handleSettingsMenuClick('appearance')} className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Palette className="w-5 h-5" />
                    <span>Appearance</span>
                  </button>
                </div>

                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button onClick={() => handleSettingsMenuClick('logout')} className="w-full flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400">
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;