
import React from 'react';
import type { ResponseSource } from '../types';

interface ResponseDisplayProps {
  response: string;
  source: ResponseSource;
  isLoading: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, source, isLoading }) => {
  const getSourceBadge = () => {
    if (!source) return null;

    const baseClasses = "text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full";
    if (source === 'Cached') {
      return <span className={`${baseClasses} bg-blue-200 text-blue-800`}>Source: Cached (RAG)</span>;
    }
    if (source === 'Generated') {
      return <span className={`${baseClasses} bg-green-200 text-green-800`}>Source: Generated (Gemini)</span>;
    }
    return null;
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-inner min-h-[150px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-200">Response</h2>
        {!isLoading && getSourceBadge()}
      </div>
      <div className="prose prose-invert max-w-none text-slate-300">
        {isLoading ? (
          <div className="flex items-center justify-center h-24">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-base-300 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-base-300 rounded"></div>
                        <div className="h-4 bg-base-300 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
          </div>
        ) : (
          response ? <p>{response}</p> : <p className="text-slate-400">Your response will appear here...</p>
        )}
      </div>
    </div>
  );
};

export default ResponseDisplay;
