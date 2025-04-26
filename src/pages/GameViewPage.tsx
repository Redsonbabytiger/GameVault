import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, ExternalLink, ArrowLeft, Globe, Clock, PlayCircle, X } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import EmptyState from '../components/EmptyState';
import GameDownloader from '../components/GameDownloader';
import GameHosting from '../components/GameHosting';

const GameViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGame, updateGame } = useGameContext();
  const [activeTab, setActiveTab] = useState<'info' | 'download' | 'host'>('info');
  const [game, setGame] = useState(id ? getGame(id) : undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (id) {
      const gameData = getGame(id);
      setGame(gameData);
    }
  }, [id, getGame]);
  
  if (!game) {
    return <EmptyState type="game" />;
  }
  
  const handlePlayGame = () => {
    setIsPlaying(true);
    // Update play count and last played timestamp
    const updatedGame = {
      ...game,
      playCount: game.playCount + 1,
      lastPlayed: new Date().toISOString()
    };
    
    updateGame(game.id, updatedGame);
  };
  
  return (
    <div className="space-y-8">
      {/* Game playing overlay */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-slate-900">
            <h2 className="text-white font-bold text-xl">{game.title}</h2>
            <button
              onClick={() => setIsPlaying(false)}
              className="text-white hover:text-slate-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 relative">
            <iframe
              src={game.url}
              title={game.title}
              className="absolute inset-0 w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      )}

      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/library')}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold">{game.title}</h1>
      </div>
      
      {/* Game preview and info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md">
            <div className="aspect-video bg-slate-200 dark:bg-slate-700 relative">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={handlePlayGame}
                  className="bg-white/90 hover:bg-white text-blue-600 rounded-full p-4 transition-transform hover:scale-110"
                >
                  <PlayCircle className="w-12 h-12 fill-current" />
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-700">
              <nav className="flex">
                <button
                  className={`px-6 py-4 font-medium text-sm border-b-2 ${
                    activeTab === 'info'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                      : 'border-transparent hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  onClick={() => setActiveTab('info')}
                >
                  Game Info
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm border-b-2 ${
                    activeTab === 'download'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                      : 'border-transparent hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  onClick={() => setActiveTab('download')}
                >
                  Download
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm border-b-2 ${
                    activeTab === 'host'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                      : 'border-transparent hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  onClick={() => setActiveTab('host')}
                >
                  Host Game
                </button>
              </nav>
            </div>
            
            {/* Tab content */}
            <div className="p-6">
              {activeTab === 'info' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Description</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {game.description || 'No description available for this game.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                        <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Original URL</p>
                        <a
                          href={game.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {new URL(game.url).hostname}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Added On</p>
                        <p>{new Date(game.dateAdded).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'download' && (
                <GameDownloader game={game} />
              )}
              
              {activeTab === 'host' && (
                <GameHosting game={game} />
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Game actions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Game Actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={handlePlayGame}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Play Game</span>
              </button>
              
              <button
                onClick={() => setActiveTab('download')}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  game.isDownloaded
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <Download className="w-5 h-5" />
                <span>{game.isDownloaded ? 'Downloaded' : 'Download Game'}</span>
              </button>
              
              <button
                onClick={() => setActiveTab('host')}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  game.isHosted
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <ExternalLink className="w-5 h-5" />
                <span>{game.isHosted ? 'View Hosted Game' : 'Host Game'}</span>
              </button>
            </div>
          </div>
          
          {/* Game stats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">Game Stats</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Play Count</span>
                  <span className="text-sm font-medium">{game.playCount}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, game.playCount * 10)}%` }}
                  />
                </div>
              </div>
              
              {game.size && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Size</span>
                    <span className="text-sm font-medium">{game.size}</span>
                  </div>
                </div>
              )}
              
              {game.lastPlayed && (
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Last Played</span>
                    <span className="text-sm font-medium">
                      {new Date(game.lastPlayed).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameViewPage;