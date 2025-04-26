import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isProcessing: boolean;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit, isProcessing }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    // Check if it's a valid URL format
    try {
      const parsedUrl = new URL(url);
      if (!parsedUrl.protocol.startsWith('http')) {
        setError('URL must start with http:// or https://');
        return;
      }
      setError(null);
      onSubmit(url);
    } catch (err) {
      setError('Please enter a valid URL');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://buildncrush.com"
          className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
          } dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2`}
          disabled={isProcessing}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="submit"
            className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-medium transition-colors ${
              isProcessing ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Processing...
              </>
            ) : (
              'Get Game'
            )}
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default UrlForm;