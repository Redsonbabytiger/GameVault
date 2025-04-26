import React, { useState } from 'react';
import { ExternalLink, Share2, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { useGameContext } from '../context/GameContext';
import { Game, GameStatus } from '../types';

interface GameHostingProps {
  game: Game;
}

const GameHosting: React.FC<GameHostingProps> = ({ game }) => {
  const { updateGame } = useGameContext();
  const [status, setStatus] = useState<GameStatus>(game.isHosted ? 'success' : 'idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const mockHostedUrl = `https://gamevault.app/hosted/${game.id}`;

  const handleHostGame = async () => {
    setStatus('downloading'); // Reuse the downloading state for hosting process
    setProgress(0);
    setError(null);

    try {
      // Simulate hosting process
      for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setProgress(i * 10);
      }

      // Update game state
      updateGame(game.id, {
        isHosted: true,
        hostedUrl: mockHostedUrl,
      });

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError('An error occurred during hosting. Please try again.');
      console.error('Hosting error:', err);
    }
  };

  const copyToClipboard = () => {
    if (game.hostedUrl) {
      navigator.clipboard.writeText(game.hostedUrl)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg mb-2">Host This Game</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Host your own version of this game to share with others or embed on your website.
        </p>
      </div>

      {status === 'idle' && (
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="font-bold text-lg">Ready to Host</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Create your own hosted version of this game to share with others.
              </p>
            </div>
            <button
              onClick={handleHostGame}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Host Now</span>
            </button>
          </div>
        </div>
      )}

      {status === 'downloading' && (
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
          <h4 className="font-bold text-lg mb-2">Setting Up Hosting...</h4>
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Please wait while we prepare your hosted instance.
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg">Hosting Complete</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Your game is now hosted and available to share with others.
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="hosted-url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Your Hosted Game URL
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="hosted-url"
                  value={game.hostedUrl || mockHostedUrl}
                  readOnly
                  className="block w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-800 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-slate-300"
                />
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center space-x-1 px-4 py-2 ${
                    copySuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  } rounded-r-lg transition-colors`}
                >
                  {copySuccess ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href={game.hostedUrl || mockHostedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Visit Hosted Game</span>
              </a>
              
              <button
                onClick={() => {
                  if (game.hostedUrl) {
                    navigator.share({
                      title: game.title,
                      text: `Check out this hosted game: ${game.title}`,
                      url: game.hostedUrl
                    }).catch(err => {
                      console.error('Share failed:', err);
                      copyToClipboard();
                    });
                  }
                }}
                className="flex items-center space-x-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-5 py-2 rounded-lg font-medium transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg">Hosting Failed</h4>
              <p className="text-slate-600 dark:text-slate-300">
                {error || 'An error occurred while setting up hosting.'}
              </p>
              <button
                onClick={handleHostGame}
                className="mt-4 flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
        <h4 className="font-bold text-lg mb-2">About Game Hosting</h4>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          When you host a game with GameVault:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
          <li>We create a dedicated URL for your hosted version</li>
          <li>The game can be shared with anyone, even if they don't have GameVault</li>
          <li>You can embed it on your own website using an iframe</li>
          <li>The hosted version stays online even when your device is offline</li>
        </ul>
      </div>
    </div>
  );
};

export default GameHosting;