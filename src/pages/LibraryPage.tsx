import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, ExternalLink, Trash2, Play } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import EmptyState from '../components/EmptyState';

const LibraryPage: React.FC = () => {
  const { games, removeGame } = useGameContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'downloaded' | 'hosted'>('all');

  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Apply search filter
        if (searchTerm && !game.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        // Apply status filter
        if (filter === 'downloaded' && !game.isDownloaded) return false;
        if (filter === 'hosted' && !game.isHosted) return false;
        
        return true;
      })
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }, [games, searchTerm, filter]);

  if (games.length === 0) {
    return <EmptyState type="library" />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Your Game Library</h1>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'downloaded' | 'hosted')}
              className="appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 pl-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Games</option>
              <option value="downloaded">Downloaded</option>
              <option value="hosted">Hosted</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            No games match your current filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div 
                className="h-40 bg-slate-200 dark:bg-slate-700 relative cursor-pointer"
                onClick={() => navigate(`/game/${game.id}`)}
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{game.title}</h3>
                </div>
                
                {/* Status indicators */}
                <div className="absolute top-2 right-2 flex space-x-1">
                  {game.isDownloaded && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Downloaded
                    </span>
                  )}
                  {game.isHosted && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Hosted
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Added: {new Date(game.dateAdded).toLocaleDateString()}
                    </p>
                    {game.lastPlayed && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Last played: {new Date(game.lastPlayed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {game.playCount} {game.playCount === 1 ? 'play' : 'plays'}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {game.isDownloaded ? (
                    <button
                      className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-sm font-medium"
                      onClick={() => navigate(`/game/${game.id}`)}
                    >
                      <Play className="w-4 h-4" />
                      <span>Play Offline</span>
                    </button>
                  ) : (
                    <button
                      className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg text-sm font-medium"
                      onClick={() => navigate(`/game/${game.id}`)}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  )}
                  
                  {game.isHosted ? (
                    <a
                      href={game.hostedUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Hosted</span>
                    </a>
                  ) : (
                    <button
                      className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium"
                      onClick={() => navigate(`/game/${game.id}`)}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Host Game</span>
                    </button>
                  )}
                  
                  <button
                    className="flex items-center space-x-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium ml-auto"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to remove this game?')) {
                        removeGame(game.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;