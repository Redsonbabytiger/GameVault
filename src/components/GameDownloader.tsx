import React, { useState } from 'react';
import { Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { Game, GameStatus } from '../types';

interface GameDownloaderProps {
  game: Game;
}

const GameDownloader: React.FC<GameDownloaderProps> = ({ game }) => {
  const { updateGame, isDownloading, setIsDownloading } = useGameContext();
  const [status, setStatus] = useState<GameStatus>(game.isDownloaded ? 'success' : 'idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (isDownloading) {
      return;
    }

    setIsDownloading(true);
    setStatus('downloading');
    setProgress(0);
    setError(null);

    try {
      // Simulate a download process
      for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(i * 10);
      }

      // Update game state
      updateGame(game.id, {
        isDownloaded: true,
        size: '15.2 MB', // Mock size
      });

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError('An error occurred during download. Please try again.');
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg mb-2">Download Game</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Download this game to play it offline, anytime without internet connection.
        </p>
      </div>

      {status === 'idle' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="font-bold text-lg">Ready to Download</h4>
              <p className="text-slate-600 dark:text-slate-300">
                This will save the game for offline play.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
              disabled={isDownloading}
            >
              <Download className="w-5 h-5" />
              <span>Download Now</span>
            </button>
          </div>
        </div>
      )}

      {status === 'downloading' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-2">Downloading...</h4>
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Please keep this page open while downloading.
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg">Download Complete</h4>
              <p className="text-slate-600 dark:text-slate-300">
                This game is now available for offline play. You can find it in your library.
              </p>
              {game.size && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Size: {game.size}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg">Download Failed</h4>
              <p className="text-slate-600 dark:text-slate-300">
                {error || 'An error occurred while downloading the game.'}
              </p>
              <button
                onClick={handleDownload}
                className="mt-4 flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
        <h4 className="font-bold text-lg mb-2">How Offline Mode Works</h4>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          When you download a game for offline play, we:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-300">
          <li>Save all game assets (HTML, JavaScript, CSS, images) to your device</li>
          <li>Create a local version that works without internet connection</li>
          <li>Provide a launcher that works even when you're offline</li>
        </ol>
      </div>
    </div>
  );
};

export default GameDownloader;