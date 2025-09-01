import React from 'react';
import { X, User, Settings, Shield, BarChart3 } from 'lucide-react';
import playzeloLogo from '../../assets/image/logo2.png'; // Adjust path according to your structure

const ProfileModal = ({ isOpen, onClose, isDarkMode, activeSection, setActiveSection }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              My Profile
            </h2>
            <div className="flex items-center space-x-6">
              <img 
                src={playzeloLogo} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
              />
              <div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Change Photo
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input 
                  type="text" 
                  defaultValue="PlayZelo Admin"
                  className={`w-full p-3 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input 
                  type="email" 
                  defaultValue="admin@playzelo.com"
                  className={`w-full p-3 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone
                </label>
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 123-4567"
                  className={`w-full p-3 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Role
                </label>
                <select className={`w-full p-3 border rounded-lg ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}>
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Manager</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                Save Changes
              </button>
              <button 
                onClick={onClose}
                className={`px-6 py-2 border rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Account Settings
            </h2>
            <div className="space-y-4">
              <div className={`p-4 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Email Notifications
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Receive email alerts for important activities
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                    <span className="translate-x-6 inline-block h-4 w-4 rounded-full bg-white transition"></span>
                  </button>
                </div>
              </div>

              <div className={`p-4 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      SMS Notifications
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Get SMS alerts for critical system events
                    </p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 rounded-full bg-white transition"></span>
                  </button>
                </div>
              </div>

              <div className={`p-4 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Two-Factor Authentication
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Security Settings
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Password
                    </label>
                    <input 
                      type="password" 
                      className={`w-full p-3 border rounded-lg ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      New Password
                    </label>
                    <input 
                      type="password" 
                      className={`w-full p-3 border rounded-lg ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirm Password
                    </label>
                    <input 
                      type="password" 
                      className={`w-full p-3 border rounded-lg ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div className={`p-4 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Login Sessions
                </h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Current active sessions on your account
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Session (Chrome, Windows)
                    </span>
                    <span className="text-xs text-green-500">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mobile App (iOS)
                    </span>
                    <button className="text-xs text-red-500 hover:text-red-600">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Analytics Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Login Activity
                </h3>
                <p className={`text-2xl font-bold text-blue-500`}>247</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total logins this month
                </p>
              </div>
              
              <div className={`p-6 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Session Duration
                </h3>
                <p className={`text-2xl font-bold text-green-500`}>4.2h</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Average session time
                </p>
              </div>
              
              <div className={`p-6 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Actions Performed
                </h3>
                <p className={`text-2xl font-bold text-purple-500`}>1,847</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Admin actions this month
                </p>
              </div>
              
              <div className={`p-6 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
              }`}>
                <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Last Login
                </h3>
                <p className={`text-2xl font-bold text-orange-500`}>2h ago</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  From Chrome on Windows
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } overflow-hidden`}>
        <div className={`flex h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Sidebar */}
          <div className={`w-64 border-r ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'} p-4`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Account
              </h3>
              <button 
                onClick={onClose}
                className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'My Profile', icon: User },
                { id: 'settings', label: 'Account Settings', icon: Settings },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                      activeSection === item.id
                        ? 'bg-blue-500 text-white'
                        : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;