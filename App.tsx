
import React, { useState, useEffect, useCallback } from 'react';
import PromptInput from './components/PromptInput';
import ResponseDisplay from './components/ResponseDisplay';
import CacheDisplay from './components/CacheDisplay';
import { generateResponse } from './services/geminiService';
import { searchCache, addToCache, getAllCacheEntries, clearCache } from './services/cacheService';
import type { CacheEntry, ResponseSource } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [responseSource, setResponseSource] = useState<ResponseSource>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);

  const refreshCacheView = useCallback(() => {
    setCacheEntries(getAllCacheEntries());
  }, []);

  useEffect(() => {
    refreshCacheView();
  }, [refreshCacheView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setResponseSource(null);

    const cachedResponse = searchCache(prompt);

    if (cachedResponse) {
      setTimeout(() => { // Simulate network latency for cache hits
        setResponse(cachedResponse);
        setResponseSource('Cached');
        setIsLoading(false);
      }, 500);
    } else {
      const generatedResponse = await generateResponse(prompt);
      setResponse(generatedResponse);
      setResponseSource('Generated');
      addToCache(prompt, generatedResponse);
      refreshCacheView();
      setIsLoading(false);
    }
  };

  const handleClearCache = () => {
    clearCache();
    refreshCacheView();
    setResponse('User cache cleared. Pre-populated examples remain.');
    setResponseSource(null);
  };
  
  const handleSelectCachedPrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto space-y-8">
        <header className="text-center">
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                RAG-Enhanced Prompt Processor
            </h1>
            <p className="mt-4 text-lg text-slate-300">
                Checks a local cache before calling Gemini to save on token generation.
            </p>
        </header>
        
        <div className="bg-base-200/50 p-6 rounded-xl shadow-2xl border border-base-300 space-y-6">
            <PromptInput 
                prompt={prompt} 
                setPrompt={setPrompt}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
            <ResponseDisplay
                response={response}
                source={responseSource}
                isLoading={isLoading}
            />
        </div>

        <CacheDisplay
            entries={cacheEntries}
            onClear={handleClearCache}
            onSelect={handleSelectCachedPrompt}
        />
      </main>
    </div>
  );
};

export default App;
