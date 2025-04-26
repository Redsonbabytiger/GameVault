import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ExternalLink } from 'lucide-react';

// Sample featured games - in a real app these would come from an API or store
const sampleGames = [
  {
    id: 'sample1',
    title: 'BuildNCrush',
    description: 'A block-building game where you create and destroy structures.',
    thumbnail: 'https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg',
    url: 'https://buildncrush.com'
  },
  {
    id: 'sample2',
    title: 'Pixel Adventure',
    description: 'Explore a pixelated world full of challenges and treasures.',
    thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
    url: 'https://example.com/pixel-adventure'
  },
  {
    id: 'sample3',
    title: 'Space Racers',
    description: 'Race through the cosmos in this fast-paced space adventure.',
    thumbnail: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg',
    url: 'https://example.com/space-racers'
  }
];

const FeaturedGames: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleGames.map((game) => (
        <div 
          key={game.id}
          className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg group hover:-translate-y-1"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
              <a 
                href={game.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-medium bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm p-2 rounded-md flex items-center space-x-1"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit</span>
              </a>
              <button 
                className="text-white font-medium bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm p-2 rounded-md flex items-center space-x-1"
                onClick={() => navigate(`/library`)}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1">{game.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{game.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedGames;