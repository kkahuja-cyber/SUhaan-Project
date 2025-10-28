
import React from 'react';
import type { CacheEntry } from '../types';

interface CacheDisplayProps {
  entries: CacheEntry[];
  onClear: () => void;
  onSelect: (prompt: string) => void;
}

const CacheDisplay: React.FC<CacheDisplayProps> = ({ entries, onClear, onSelect }) => {
  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-200">Cached Prompts</h2>
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
          </svg>
          Clear User Cache
        </button>
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div key={index} 
                 onClick={() => onSelect(entry.prompt)}
                 className="bg-base-300 p-3 rounded-md cursor-pointer hover:bg-brand-primary transition-colors duration-200">
              <p className="text-sm font-semibold truncate text-slate-200">{entry.prompt}</p>
              <p className="text-xs text-slate-400 mt-1 truncate">{entry.response}</p>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm">Cache is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CacheDisplay;
