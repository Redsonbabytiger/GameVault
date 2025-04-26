import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ExternalLink, ArrowRight, LibraryBig } from 'lucide-react';
import UrlForm from '../components/UrlForm';
import FeaturedGames from '../components/FeaturedGames';
import { useGameContext } from '../context/GameContext';
import { v4 as uuidv4 } from 'uuid';

const HomePage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { addGame } = useGameContext();
  const navigate = useNavigate();

  const handleGameSubmit = async (url: string) => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would validate and fetch game metadata
      // This is a simplified mock implementation
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock game data
      const gameId = uuidv4();
      const websiteDomain = new URL(url).hostname;
      
      addGame({
        id: gameId,
        url: url,
        title: websiteDomain.split('.')[0].charAt(0).toUpperCase() + websiteDomain.split('.')[0].slice(1),
        description: `A web game from ${websiteDomain}`,
        thumbnail: `https://picsum.photos/seed/${gameId}/800/600`,
        dateAdded: new Date().toISOString(),
        isDownloaded: false,
        isHosted: false,
        playCount: 0
      });
      
      // Navigate to the game page
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error('Error processing game URL:', error);
      // Here you would handle errors appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Play Your Favorite Web Games Anytime, Anywhere
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Download browser games for offline play or host them yourself with GameVault.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 bg-white text-blue-900 px-5 py-3 rounded-lg font-medium transition-transform hover:scale-105">
                <Download className="w-5 h-5" />
                <span>Save Games Offline</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-transform hover:scale-105">
                <ExternalLink className="w-5 h-5" />
                <span>Host Games Yourself</span>
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg"
              alt="Gaming illustration"
              className="rounded-lg shadow-lg w-full object-cover h-80"
            />
          </div>
        </div>
      </section>

      {/* URL Input Section */}
      <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Get Started with Your Game
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Enter the URL of your favorite web-based game to download it for offline play or set up hosting.
          </p>
        </div>
        <UrlForm onSubmit={handleGameSubmit} isProcessing={isProcessing} />
      </section>

      {/* Featured Games */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Featured Games</h2>
          <button className="flex items-center text-blue-600 dark:text-blue-400 hover:underline" onClick={() => navigate('/library')}>
            <span>View All</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <FeaturedGames />
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
            <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Download Games</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Save your favorite browser games for offline play, whenever and wherever you want.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-4">
            <ExternalLink className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Host Your Games</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Create your own hosted version of games to share with friends or embed on your website.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
            <LibraryBig className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Game Library</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Organize and manage your collection of games with our intuitive library interface.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;