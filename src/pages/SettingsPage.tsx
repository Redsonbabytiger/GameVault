import React, { useState } from 'react';
import { Save, Moon, Sun, Trash2 } from 'lucide-react';
import { useGameContext } from '../context/GameContext';

const SettingsPage: React.FC = () => {
  const { games } = useGameContext();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [saveDownloadedGames, setSaveDownloadedGames] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showStatusMessage, setShowStatusMessage] = useState(false);
  
  const handleSaveSettings = () => {
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('saveDownloadedGames', saveDownloadedGames.toString());
    localStorage.setItem('notifications', notifications.toString());
    
    // Toggle dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Show success message
    setShowStatusMessage(true);
    setTimeout(() => {
      setShowStatusMessage(false);
    }, 3000);
  };
  
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all app data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Switch between light and dark theme
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  >
                    {darkMode ? (
                      <Moon className="h-3 w-3 text-slate-700" />
                    ) : (
                      <Sun className="h-3 w-3 text-amber-500" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Game Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Game Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Save Downloaded Games</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Keep downloaded games on your device for offline play
                  </p>
                </div>
                <button
                  onClick={() => setSaveDownloadedGames(!saveDownloadedGames)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    saveDownloadedGames ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span className="sr-only">Toggle save downloaded games</span>
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      saveDownloadedGames ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive notifications about game downloads and updates
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span className="sr-only">Toggle notifications</span>
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Data Management */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Data Management</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Clear All App Data</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Remove all saved games and reset all settings
                </p>
                <button
                  onClick={clearAllData}
                  className="flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Settings Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Games in Library</p>
                <p className="font-bold text-lg">{games.length}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Downloaded Games</p>
                <p className="font-bold text-lg">
                  {games.filter(game => game.isDownloaded).length}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Hosted Games</p>
                <p className="font-bold text-lg">
                  {games.filter(game => game.isHosted).length}
                </p>
              </div>
              
              <button
                onClick={handleSaveSettings}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors mt-4"
              >
                <Save className="w-5 h-5" />
                <span>Save Settings</span>
              </button>
              
              {showStatusMessage && (
                <div className="mt-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm text-center">
                  Settings saved successfully!
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">About</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Version</p>
                <p className="font-medium">1.0.0</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Made with</p>
                <p className="font-medium">React, Tailwind CSS</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">License</p>
                <p className="font-medium">MIT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;