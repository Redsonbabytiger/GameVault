import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game } from '../types';

interface GameContextType {
  games: Game[];
  addGame: (game: Game) => void;
  removeGame: (id: string) => void;
  updateGame: (id: string, updatedGame: Partial<Game>) => void;
  getGame: (id: string) => Game | undefined;
  isDownloading: boolean;
  setIsDownloading: (state: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Load games from localStorage on initial render
  useEffect(() => {
    const savedGames = localStorage.getItem('games');
    if (savedGames) {
      try {
        setGames(JSON.parse(savedGames));
      } catch (error) {
        console.error('Failed to parse games from localStorage:', error);
      }
    }
  }, []);

  // Save games to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('games', JSON.stringify(games));
  }, [games]);

  const addGame = (game: Game) => {
    setGames((prevGames) => [...prevGames, game]);
  };

  const removeGame = (id: string) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
  };

  const updateGame = (id: string, updatedGame: Partial<Game>) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === id ? { ...game, ...updatedGame } : game
      )
    );
  };

  const getGame = (id: string) => {
    return games.find((game) => game.id === id);
  };

  return (
    <GameContext.Provider
      value={{
        games,
        addGame,
        removeGame,
        updateGame,
        getGame,
        isDownloading,
        setIsDownloading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};