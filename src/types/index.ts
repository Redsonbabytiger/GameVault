export interface Game {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  dateAdded: string;
  lastPlayed?: string;
  isDownloaded: boolean;
  isHosted: boolean;
  hostedUrl?: string;
  size?: string;
  category?: string;
  playCount: number;
}

export type GameStatus = 'idle' | 'downloading' | 'error' | 'success';