import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LibraryBig, Settings, Plus } from 'lucide-react';

interface EmptyStateProps {
  type: 'library' | 'settings' | 'game';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const navigate = useNavigate();
  
  const getContent = () => {
    switch (type) {
      case 'library':
        return {
          icon: <LibraryBig className="w-16 h-16 text-blue-500 mb-4" />,
          title: 'Your Game Library is Empty',
          description: 'Add your first game to start building your collection.',
          buttonText: 'Add Your First Game',
          buttonAction: () => navigate('/')
        };
      case 'settings':
        return {
          icon: <Settings className="w-16 h-16 text-blue-500 mb-4" />,
          title: 'No Settings Available',
          description: 'There are currently no settings to configure.',
          buttonText: 'Back to Home',
          buttonAction: () => navigate('/')
        };
      case 'game':
        return {
          icon: <Plus className="w-16 h-16 text-blue-500 mb-4" />,
          title: 'Game Not Found',
          description: "The game you're looking for doesn't exist or has been removed.",
          buttonText: 'Back to Library',
          buttonAction: () => navigate('/library')
        };
      default:
        return {
          icon: <LibraryBig className="w-16 h-16 text-blue-500 mb-4" />,
          title: 'Nothing to See Here',
          description: 'This section is currently empty.',
          buttonText: 'Back to Home',
          buttonAction: () => navigate('/')
        };
    }
  };
  
  const content = getContent();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-full mb-6">
        {content.icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        {content.description}
      </p>
      <button
        onClick={content.buttonAction}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        {content.buttonText}
      </button>
    </div>
  );
};

export default EmptyState;